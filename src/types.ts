export interface TimeConfig {
  hour: number;
  minute: number;
}

export interface LuxAutomation {
  entity: string;           
  above?: number;          
  below?: number;          
  position: number;        
  before?: TimeConfig;     
  after?: TimeConfig;      
}

export interface CoverConfig {
  name: string;
  entity: string;
  lock_entity?: string;     
  middle_position?: number; 
  sun_position?: number;    
  moon_position?: number;  
  lux_automation?: LuxAutomation[]; 
}

export interface RoomConfig {
  name: string;
  covers: CoverConfig[];
  middle_position?: number;
  sun_position?: number;    
  moon_position?: number;   
  lux_automation?: LuxAutomation[]; 
}

export interface CardConfig {
  type: string;
  title?: string;           
  middle_position?: number; 
  sun_position?: number;    
  moon_position?: number;  
  invert_percentage?: boolean;
  rooms: RoomConfig[];
  lux_automation?: LuxAutomation[];
}