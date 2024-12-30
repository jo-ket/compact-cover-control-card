# Compact Cover Control Card

A space-efficient custom card for Home Assistant that provides an intuitive interface for controlling multiple cover entities organized by rooms. Perfect for managing blinds, shades, and other cover entities across your home.

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GH-release](https://img.shields.io/github/v/release/YOUR_GITHUB_USERNAME/compact-cover-control-card.svg?style=flat-square)](https://github.com/YOUR_GITHUB_USERNAME/compact-cover-control-card/releases)
[![GH-downloads](https://img.shields.io/github/downloads/YOUR_GITHUB_USERNAME/compact-cover-control-card/total?style=flat-square)](https://github.com/YOUR_GITHUB_USERNAME/compact-cover-control-card/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/YOUR_GITHUB_USERNAME/compact-cover-control-card.svg?style=flat-square)](https://github.com/YOUR_GITHUB_USERNAME/compact-cover-control-card/commits/master)

## Features

- 🏠 Group covers by rooms for organized control
- 🎚️ Individual sliders with visual position indication
- 🔒 Optional lock functionality for weather protection or safety interlocks
- 🎯 Customizable middle position per cover, room, or globally
- 🔄 Support for KNX-style percentage inversion
- ⚡ Quick actions for entire rooms (open, middle position, close)
- 🎨 Gradient visualization of cover positions
- 🏃‍♂️ Responsive design with Home Assistant theme integration

## Installation

### HACS (Recommended)

1. Make sure [HACS](https://hacs.xyz/) is installed in your Home Assistant instance
2. Search for "Compact Cover Control Card" in HACS frontend
3. Click Install 
4. Add configuration to your dashboard

### Manual Installation (Not Recommended)

1. Copy `compact-cover-control-card.js` to your `config/www` folder
2. Add reference to card in your `configuration.yaml`:
```yaml
frontend:
  extra_module_url:
    - /local/compact-cover-control-card.js
```
3. Restart Home Assistant

## Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | *optional* | Card title |
| `invert_percentage` | boolean | `false` | Invert percentage display (useful for KNX covers where 0% means open and 100% means closed) |
| `middle_position` | number | `50` | Default middle position (0-100) for all covers |
| `rooms` | array | *required* | List of room configurations |

### Room Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | *required* | Room name |
| `middle_position` | number | *optional* | Override default middle position for this room |
| `covers` | array | *required* | List of cover configurations |

### Cover Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | *required* | Cover name |
| `entity` | string | *required* | Cover entity ID |
| `lock_entity` | string | *optional* | Entity ID for lock control (when state is 'on', cover controls are disabled) |
| `middle_position` | number | *optional* | Override middle position for this specific cover |

## Usage Examples

### Minimal Configuration

```yaml
type: custom:compact-cover-control-card
rooms:
  - name: Living Room
    covers:
      - name: Window
        entity: cover.living_room_window
```

### Complete Configuration

```yaml
type: custom:compact-cover-control-card
title: House Blinds
invert_percentage: true
middle_position: 70
rooms:
  - name: Living Room
    middle_position: 60
    covers:
      - name: Main Window
        entity: cover.living_room_main
        lock_entity: binary_sensor.living_room_window_open
        middle_position: 50
      - name: Side Window
        entity: cover.living_room_side
        lock_entity: binary_sensor.weather_protection
  - name: Bedroom
    covers:
      - name: Window Left
        entity: cover.bedroom_left
      - name: Window Right
        entity: cover.bedroom_right
```

## Special Features

### KNX Integration
The `invert_percentage` option is particularly useful for KNX installations where the cover percentage is inverted compared to Home Assistant's standard (in KNX, 0% typically means fully open, while in Home Assistant 0% means fully closed). Enable this option to match your KNX cover behavior while maintaining an intuitive user interface.

### Lock Functionality
The `lock_entity` option allows you to disable cover controls based on the state of another entity. This is useful for:
- Weather protection (disable controls during high winds)
- Safety interlocks (prevent operation when windows are open)
- Child safety (disable specific covers when needed)
- Maintenance mode

The cover controls will be disabled when the lock entity state is 'on'.

### Position Control
- Room-level quick actions (☀️, ⛅, 🌙) control all covers in the room
- Individual sliders provide fine-grained control
- Middle position (⛅) is customizable at card, room, or cover level
- Visual gradient indicates current position with blue (closed) to yellow (open) transition

## Screenshots

<div align="center">
Standard View with Home Assistant Cover Percentages

<img src=".github/images/standard_view.png" width="600" alt="Standard View"/>

Inverted Percentages for KNX Integration

<img src=".github/images/inverted_view.png" width="600" alt="Inverted Percentages View"/>

Lock Functionality (Weather Protection / Safety Interlock)

<img src=".github/images/one_cover_locked.png" width="600" alt="Locked Cover Example"/>
</div>

## Development

This card follows the Home Assistant development recommendations and is built using the following technologies:
- TypeScript
- Lit Elements

### Building From Source

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Build
```bash
npm run build
```

## Support

If you find this card useful and want to support its development:

⭐️ Star this repository on GitHub

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is under the MIT License. See the LICENSE file for the full license text.