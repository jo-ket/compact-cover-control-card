import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig, RoomConfig, CoverConfig } from './types';
import { CoverAutomationHandler } from './cover-automation';

@customElement('compact-cover-control-card')
export class CompactCoverControlCard extends LitElement {
  static readonly DEFAULT_MIDDLE_POSITION = 50;
  static readonly DEFAULT_SUN_POSITION = 100;    
  static readonly DEFAULT_MOON_POSITION = 0;    
  static readonly SLIDER_MIN = 0;
  static readonly SLIDER_MAX = 100;
  static readonly GRADIENT_COLORS = {
    CLOSED: 'rgb(59, 130, 246)',  // blue
    OPEN: 'rgb(250, 204, 21)'     // yellow
  };

  private automationHandler?: CoverAutomationHandler;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public config!: CardConfig;

  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    return changedProps.has("hass") || changedProps.has("config");
  }

  static styles = css`
    .card-content {
      padding: 16px;
    }
    .floor-title {
      font-size: 1.2em;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .room {
      background: var(--card-background-color, white);
      border-radius: var(--ha-card-border-radius, 4px);
      box-shadow: var(--ha-card-box-shadow, none);
      padding: 12px;
      margin-bottom: 8px;
    }
    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .room-name {
      font-size: 1.1em;
      font-weight: 500;
    }
    .cover-control {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 4px 0;
    }
    .control-buttons {
      display: flex;
      gap: 4px;
    }
    .control-button {
      border: none;
      background: none;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    .control-button:hover {
      background-color: var(--secondary-background-color);
    }
    .slider {
      flex-grow: 1;
      height: 6px;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 3px;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
      z-index: 2;
    }
    .slider:disabled {
      opacity: 0.5;
    }
    .lock-icon {
      opacity: 0.5;
      margin-left: 4px;
    }
    .name-label {
      min-width: 120px;
      cursor: pointer;
      color: var(--primary-text-color);
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .name-label:hover {
      opacity: 1;
    }
    .value-label {
      min-width: 48px;
      text-align: right;
    }
  `;

  protected render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <ha-card>
        <div class="card-content">
          ${this.config.title ? html`
            <div class="floor-title">${this.config.title}</div>
          ` : nothing}
          ${this.config.rooms.map(room => this._renderRoom(room))}
        </div>
      </ha-card>
    `;
  }

  private _renderRoom(room: RoomConfig) {
    return html`
      <div class="room">
        <div class="room-header">
          <div class="room-name">${room.name}</div>
          <div class="control-buttons">
            <button 
              class="control-button" 
              @click=${() => this._handleRoomButtonClick(room, 'up')}
            >☀️</button>
            <button 
              class="control-button" 
              @click=${() => this._handleRoomButtonClick(room, 'middle')}
            >⛅</button>
            <button 
              class="control-button" 
              @click=${() => this._handleRoomButtonClick(room, 'down')}
            >🌙</button>
          </div>
        </div>
        ${room.covers.map(cover => this._renderCover(cover))}
      </div>
    `;
  }

  private _renderCover(cover: CoverConfig) {
    const state = this.hass.states[cover.entity];
    const isLocked = cover.lock_entity ? this.hass.states[cover.lock_entity]?.state === 'on' : false;
    const currentPosition = state?.attributes.current_position ?? 0;
    const invertedPosition = this._invertPercentage(currentPosition);
    const displayValue = state?.attributes.current_position !== undefined 
      ? `${invertedPosition}%` 
      : '---';

    return html`
      <div class="cover-control">
        <span class="name-label" @click=${() => this._handleNameClick(cover.entity)}>
          ${cover.name}
        </span>
        <input 
          type="range" 
          min="${CompactCoverControlCard.SLIDER_MIN}"
          max="${CompactCoverControlCard.SLIDER_MAX}"
          .value=${currentPosition}
          @input=${(e: Event) => this._handleSliderChange(e, cover.entity)}
          class="slider"
          style="
            direction: ${this.config.invert_percentage ? 'rtl' : 'ltr'};
            background: ${this._calculateGradient(currentPosition)};
          "
          ?disabled=${isLocked || !state || state.state === 'unavailable'}
        />
        <span class="value-label">
          ${displayValue}
          ${cover.lock_entity && isLocked ? html`<span class="lock-icon">🔒</span>` : ''}
        </span>
      </div>
    `;
  }

  private _calculateGradient(currentPosition: number): string {
    const gradientPosition = this.config.invert_percentage ? 
      (CompactCoverControlCard.SLIDER_MAX - currentPosition) : currentPosition;
    const startColor = this.config.invert_percentage ? 
      CompactCoverControlCard.GRADIENT_COLORS.CLOSED : 
      CompactCoverControlCard.GRADIENT_COLORS.OPEN;
    const endColor = this.config.invert_percentage ? 
      CompactCoverControlCard.GRADIENT_COLORS.OPEN : 
      CompactCoverControlCard.GRADIENT_COLORS.CLOSED;
    
    return `linear-gradient(to right, 
      ${startColor} ${CompactCoverControlCard.SLIDER_MIN}%, 
      ${startColor} ${gradientPosition}%, 
      ${endColor} ${gradientPosition}%, 
      ${endColor} ${CompactCoverControlCard.SLIDER_MAX}%)`;
  }

  private _handleNameClick(entityId: string) {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private _invertPercentage(position: number): number {
    return this.config.invert_percentage ? CompactCoverControlCard.SLIDER_MAX - position : position;
  }

  private _getMiddlePosition(cover: CoverConfig, room: RoomConfig): number {
    return cover.middle_position ?? 
           room.middle_position ?? 
           this.config.middle_position ?? 
           CompactCoverControlCard.DEFAULT_MIDDLE_POSITION;
  }

  private _getSunPosition(cover: CoverConfig, room: RoomConfig): number {
    return cover.sun_position ?? 
           room.sun_position ?? 
           this.config.sun_position ?? 
           CompactCoverControlCard.DEFAULT_SUN_POSITION;
  }

  private _getMoonPosition(cover: CoverConfig, room: RoomConfig): number {
    return cover.moon_position ?? 
           room.moon_position ?? 
           this.config.moon_position ?? 
           CompactCoverControlCard.DEFAULT_MOON_POSITION;
  }

  private _handleRoomButtonClick(room: RoomConfig, action: 'up' | 'middle' | 'down') {
    for (const cover of room.covers) {
      let position = action === 'up' ? this._getSunPosition(cover, room) : 
                    action === 'down' ? this._getMoonPosition(cover, room) : 
                    this._getMiddlePosition(cover, room);
      
      if (this.config.invert_percentage && action === 'middle') {
        position = CompactCoverControlCard.SLIDER_MAX - position;
      }
      
      try {
        this.hass.callService('cover', 'set_cover_position', {
          entity_id: cover.entity,
          position: position,
        });
      } catch (error) {
        console.error('Error in room button update:', error);
      }
    }
  }

  private _handleSliderChange(event: Event, entityId: string) {
    const target = event.target as HTMLInputElement;
    const position = parseInt(target.value, 10);
    
    try {
      this.hass.callService('cover', 'set_cover_position', {
        entity_id: entityId,
        position: position,
      });
    } catch (error) {
      console.error('Error in slider update:', error);
    }
  }

  private _validatePosition(position: number | undefined, errorPrefix: string): void {
    if (position !== undefined && 
        (position < CompactCoverControlCard.SLIDER_MIN || 
         position > CompactCoverControlCard.SLIDER_MAX)) {
      throw new Error(`${errorPrefix}. Must be between ${CompactCoverControlCard.SLIDER_MIN} and ${CompactCoverControlCard.SLIDER_MAX}`);
    }
  }
  
  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);
    
    if (changedProps.has('hass')) {
      if (!this.automationHandler) {
        this.automationHandler = new CoverAutomationHandler(this.config, this.hass);
      }
      this.automationHandler.updateHass(this.hass);
      this.automationHandler.handleAutomation();
    }
  }
  
  setConfig(config: CardConfig) {
    if (!config.rooms) {
      throw new Error('Please define rooms');
    }

    config.rooms.forEach((room, roomIndex) => {
      if (!room.name) {
        throw new Error(`Room ${roomIndex} is missing a name`);
      }
      if (!room.covers || !room.covers.length) {
        throw new Error(`Room ${room.name} has no covers defined`);
      }
      room.covers.forEach((cover, coverIndex) => {
        if (!cover.name) {
          throw new Error(`Cover ${coverIndex} in room ${room.name} is missing a name`);
        }
        if (!cover.entity) {
          throw new Error(`Cover ${cover.name} in room ${room.name} is missing an entity`);
        }
        this._validatePosition(cover.middle_position,
          `Cover ${cover.name} in room ${room.name} has invalid middle_position`);
        this._validatePosition(cover.sun_position,
          `Cover ${cover.name} in room ${room.name} has invalid sun_position`);
        this._validatePosition(cover.moon_position,
          `Cover ${cover.name} in room ${room.name} has invalid moon_position`);
      });
      this._validatePosition(room.middle_position, 
        `Room ${room.name} has invalid middle_position`);
      this._validatePosition(room.sun_position, 
        `Room ${room.name} has invalid sun_position`);
      this._validatePosition(room.moon_position, 
        `Room ${room.name} has invalid moon_position`);
    });

    this._validatePosition(config.middle_position, 
      'Card has invalid middle_position');
    this._validatePosition(config.sun_position, 
      'Card has invalid sun_position');
    this._validatePosition(config.moon_position, 
      'Card has invalid moon_position');

    new CoverAutomationHandler(config, this.hass);

    this.config = {
      invert_percentage: false,
      ...config
    };
  }
}