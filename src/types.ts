// src/types.ts
export interface CoverConfig {
    name: string;
    entity: string;
    lock_entity?: string;     // Optional lock entity
    middle_position?: number; // Optional middle position (default 50)
  }
  
  export interface RoomConfig {
    name: string;
    covers: CoverConfig[];
    middle_position?: number; // Optional middle position for all covers in room
  }
  
  export interface CardConfig {
    type: string;
    title?: string;           // Optional floor title
    middle_position?: number; // Optional default middle position for all covers
    invert_percentage?: boolean; // Optional: invert percentage logic (KNX mode)
    rooms: RoomConfig[];
  }