export interface Star {
    position: Position;
    size: SIZE;
  }
  
  export interface Position {
    left: number;
    top: number;
  }
  
  export enum SIZE {
    SMALL = 0,
    MED,
    BIG
  }
  
  export interface Coordinates {
    x: number;
    y: number;
  }
  
  export const BRUSH_SIZE = 50;
  