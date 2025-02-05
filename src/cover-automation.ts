// src/cover-automation.ts
import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig, RoomConfig, CoverConfig, TimeConfig, LuxAutomation } from './types';

export class CoverAutomationHandler {
  private config: CardConfig;
  private hass: HomeAssistant;
  private sensorStates: Map<string, string> = new Map();
  private initialCheckDone = false;

  constructor(config: CardConfig, hass: HomeAssistant) {
    this.hass = hass;
    this.config = this.validateConfig(config);
}

private validateConfig(config: CardConfig): CardConfig {
    // Create new config with potentially inverted positions
    const newConfig = config.invert_percentage ? {
        ...config,
        lux_automation: config.lux_automation?.map(auto => ({
            ...auto,
            position: 100 - auto.position
        })),
        rooms: config.rooms.map(room => ({
            ...room,
            lux_automation: room.lux_automation?.map(auto => ({
                ...auto,
                position: 100 - auto.position
            })),
            covers: room.covers.map(cover => ({
                ...cover,
                lux_automation: cover.lux_automation?.map(auto => ({
                    ...auto,
                    position: 100 - auto.position
                }))
            }))
        }))
    } : config;

    // Validate the new config
    if (newConfig.lux_automation) {
        this.validateAutomations(newConfig.lux_automation, 'Card');
    }
    newConfig.rooms.forEach(room => {
        if (room.lux_automation) {
            this.validateAutomations(room.lux_automation, `Room ${room.name}`);
        }
        room.covers.forEach(cover => {
            if (cover.lux_automation) {
                this.validateAutomations(cover.lux_automation, `Cover ${cover.name} in room ${room.name}`);
            }
        });
    });
    return newConfig;
  }

  private getAllSensors(): Set<string> {
    const sensors = new Set<string>();
    
    if (this.config.lux_automation) {
      this.config.lux_automation.forEach(auto => sensors.add(auto.entity));
    }

    this.config.rooms.forEach(room => {
      if (room.lux_automation) {
        room.lux_automation.forEach(auto => sensors.add(auto.entity));
      }
      room.covers.forEach(cover => {
        if (cover.lux_automation) {
          cover.lux_automation.forEach(auto => sensors.add(auto.entity));
        }
      });
    });

    return sensors;
  }

  public updateHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  public handleAutomation(): void {
    if (!this.hasAnyAutomation()) return;

    let hasChanges = !this.initialCheckDone;
    this.initialCheckDone = true;
    
    this.getAllSensors().forEach(entity => {
        const currentState = this.hass.states[entity]?.state;
        const previousState = this.sensorStates.get(entity);
        
        console.log(`Checking sensor ${entity}: current=${currentState}, previous=${previousState}`);
        
        if (currentState !== previousState) {
            console.log(`Change detected for ${entity}`);
            hasChanges = true;
            this.sensorStates.set(entity, currentState);
        }
    });

    if (hasChanges) {
        console.log('Processing automations due to changes');
        this.config.rooms.forEach(room => {
            room.covers.forEach(cover => {
                this.processCoverAutomation(cover, room);
            });
        });
    }
  }

  public hasAnyAutomation(): boolean {
    if (this.config.lux_automation?.length) return true;
    
    return this.config.rooms.some(room => {
      if (room.lux_automation?.length) return true;
      
      return room.covers.some(cover => cover.lux_automation?.length);
    });
  }

  private validateAutomations(automations: LuxAutomation[], context: string): void {
    automations.forEach((auto, index) => {
      if (!auto.entity) {
        throw new Error(`${context} automation ${index} is missing entity`);
      }
      if (auto.position === undefined) {
        throw new Error(`${context} automation ${index} is missing position`);
      }
      this.validatePosition(auto.position, `${context} automation ${index} has invalid position`);
      
      if (auto.before) {
        this.validateTime(auto.before, `${context} automation ${index} before time`);
      }
      if (auto.after) {
        this.validateTime(auto.after, `${context} automation ${index} after time`);
      }
    });
  }

  private processCoverAutomation(cover: CoverConfig, room: RoomConfig): void {
    const automations = this.getCoverAutomations(cover, room);
    if (!automations.length) return;

    const state = this.hass.states[cover.entity];
    if (!state || state.state === 'unavailable') return;

    const currentPosition = state.attributes.current_position;
    
    // Process each automation rule
    for (const auto of automations) {
      if (this.shouldAutomationRun(auto, currentPosition)) {
        this.executeAutomation(cover.entity, auto.position);
        break; // Only execute first matching automation
      }
    }
  }

  private getCoverAutomations(cover: CoverConfig, room: RoomConfig): LuxAutomation[] {
    return [
      ...(cover.lux_automation || []),
      ...(room.lux_automation || []),
      ...(this.config.lux_automation || [])
    ];
  }

  private shouldAutomationRun(auto: LuxAutomation, currentPosition: number): boolean {
    // Skip if already at target position (rounded to nearest integer)
    if (Math.round(currentPosition) === auto.position) return false;

    // Check time constraints
    if (!this.isWithinTimeWindow(auto)) return false;

    // Check lux level
    const luxState = this.hass.states[auto.entity];
    if (!luxState || luxState.state === 'unavailable') return false;

    const luxLevel = Number(luxState.state);
    if (isNaN(luxLevel)) return false;

    // Check thresholds
    if (auto.above !== undefined && luxLevel <= auto.above) return false;
    if (auto.below !== undefined && luxLevel >= auto.below) return false;

    return true;
  }

  private isWithinTimeWindow(auto: LuxAutomation): boolean {
    if (!auto.before && !auto.after) return true;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (auto.after) {
      const isAfter = currentHour > auto.after.hour || 
        (currentHour === auto.after.hour && currentMinute >= auto.after.minute);
      if (!isAfter) return false;
    }

    if (auto.before) {
      const isBefore = currentHour < auto.before.hour || 
        (currentHour === auto.before.hour && currentMinute <= auto.before.minute);
      if (!isBefore) return false;
    }

    return true;
  }

  private executeAutomation(entityId: string, position: number): void {
    try {
      this.hass.callService('cover', 'set_cover_position', {
        entity_id: entityId,
        position: position,
      });
    } catch (error) {
      console.error('Error in automation:', error);
    }
  }

  private validatePosition(position: number | undefined, errorPrefix: string): void {
    if (position !== undefined && (position < 0 || position > 100)) {
      throw new Error(`${errorPrefix}. Must be between 0 and 100`);
    }
  }

  private validateTime(time: TimeConfig, context: string): void {
    if (time.hour === undefined || time.hour < 0 || time.hour > 23) {
      throw new Error(`${context} has invalid hour`);
    }
    if (time.minute === undefined || time.minute < 0 || time.minute > 59) {
      throw new Error(`${context} has invalid minute`);
    }
  }
}