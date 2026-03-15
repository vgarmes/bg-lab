export interface LinearMaskSettings {
  angle: number;
  stop: number;
}

export interface RadialMaskSettings {
  rx: number;
  ry: number;
  posX: number;
  posY: number;
  innerStop: number;
  outerStop: number;
}

export interface Config {
  backgroundColor: string;
  grid: {
    enabled: boolean;
    size: number;
    lineColor: string;
    lineOpacity: number;
    lineThickness: number;
  };
  mask: {
    enabled: boolean;
    type: "linear" | "radial";
    linear: LinearMaskSettings;
    radial: RadialMaskSettings;
  };
}

export type Preset = Config & { name: string };
