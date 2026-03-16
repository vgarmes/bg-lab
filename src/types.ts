import type { EFFECTS } from "./presets";

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

export interface LinearBgGradientSettings {
  angle: number;
  fromStop: number;
  toStop: number;
}

export interface CircleBgGradientSettings {
  radius: number;
  posX: number;
  posY: number;
  fromStop: number;
  toStop: number;
}

export interface EllipseBgGradientSettings {
  rx: number;
  ry: number;
  posX: number;
  posY: number;
  fromStop: number;
  toStop: number;
}

export interface BackgroundGradientConfig {
  type: "linear" | "circle" | "ellipse";
  color: string;
  linear: LinearBgGradientSettings;
  circle: CircleBgGradientSettings;
  ellipse: EllipseBgGradientSettings;
}

export interface BackgroundConfig {
  type: "solid" | "gradient";
  color: string;
  gradient: BackgroundGradientConfig;
}

export interface GridConfig {
  enabled: boolean;
  size: number;
  lineColor: string;
  lineOpacity: number;
  lineThickness: number;
}

export interface MaskConfig {
  enabled: boolean;
  type: "linear" | "radial";
  linear: LinearMaskSettings;
  radial: RadialMaskSettings;
}

export interface Config {
  background: BackgroundConfig;
  grid: GridConfig;
  mask: MaskConfig;
  effect: Effect | null;
}

export type Preset = Config & { name: string };

export type Effect = (typeof EFFECTS)[number];
