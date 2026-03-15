import type { BackgroundConfig, Config, Effect, Preset } from "./types";

export const DEFAULT_BACKGROUND: BackgroundConfig = {
  type: "solid",
  color: "#ffffff",
  gradient: {
    type: "circle",
    color: "#d5c5ff",
    linear: { angle: 135, fromStop: 0, toStop: 100 },
    circle: { radius: 800, posX: 100, posY: 0, fromStop: 0, toStop: 100 },
    ellipse: { rx: 80, ry: 50, posX: 50, posY: 0, fromStop: 0, toStop: 100 },
  },
};

export const DEFAULT_CONFIG: Config = {
  background: DEFAULT_BACKGROUND,
  grid: {
    enabled: true,
    size: 45,
    lineColor: "#888888",
    lineOpacity: 100,
    lineThickness: 1,
  },
  mask: {
    enabled: false,
    type: "linear",
    linear: { angle: -20, stop: 50 },
    radial: {
      rx: 80,
      ry: 50,
      posX: 50,
      posY: 0,
      innerStop: 70,
      outerStop: 110,
    },
  },
  effect: null,
};

export const EFFECTS = ["grain", "vhs"] as const;

export const EFFECT_OPTIONS: Array<{ value: Effect; label: string }> = [
  { value: "grain", label: "Grain" },
  { value: "vhs", label: "VHS" },
];

export const PRESETS: Preset[] = [
  {
    name: "Modern Light",
    background: { ...DEFAULT_BACKGROUND, color: "#ffffff" },
    grid: {
      enabled: true,
      size: 45,
      lineColor: "#000000",
      lineThickness: 1,
      lineOpacity: 10,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: true,
      type: "linear",
      linear: { angle: -20, stop: 50 },
    },
    effect: null,
  },
  {
    name: "Modern Dark",
    background: { ...DEFAULT_BACKGROUND, color: "#000000" },
    grid: {
      enabled: true,
      size: 45,
      lineColor: "#ffffff",
      lineThickness: 1,
      lineOpacity: 20,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: true,
      type: "linear",
      linear: { angle: -20, stop: 50 },
    },
    effect: null,
  },
  {
    name: "Purple",
    background: {
      type: "gradient",
      color: "#000000",
      gradient: {
        ...DEFAULT_BACKGROUND.gradient,
        type: "circle",
        color: "#d5c5ff",
        circle: { radius: 800, posX: 100, posY: 0, fromStop: 0, toStop: 100 },
      },
    },
    grid: {
      enabled: true,
      size: 45,
      lineColor: "#f0f0f0",
      lineThickness: 1,
      lineOpacity: 20,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: true,
      type: "linear",
      linear: { angle: -20, stop: 50 },
    },
    effect: null,
  },
  {
    name: "Master System",
    background: { ...DEFAULT_BACKGROUND, color: "#ffffff" },
    grid: {
      enabled: true,
      size: 50,
      lineColor: "#7d7d7d",
      lineThickness: 2,
      lineOpacity: 50,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: true,
      type: "radial",
    },
    effect: null,
  },
];
