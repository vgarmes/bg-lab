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
    sizeX: 45,
    sizeY: 45,
    shiftX: 0.36,
    shiftY: 0.32,
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

/*
<div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
<div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
*/

export const PRESETS: Preset[] = [
  {
    name: "Purple",
    background: {
      type: "gradient",
      color: "#ffffff",
      gradient: {
        ...DEFAULT_BACKGROUND.gradient,
        type: "circle",
        color: "#d5c5ff",
        circle: { radius: 800, posX: 100, posY: 0, fromStop: 0, toStop: 100 },
      },
    },
    grid: {
      enabled: true,
      sizeX: 95,
      sizeY: 60,
      shiftX: 0,
      shiftY: 0,
      lineColor: "#f0f0f0",
      lineThickness: 1,
      lineOpacity: 100,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: false,
    },
    effect: null,
  },
  {
    name: "Modern Dark",
    background: { ...DEFAULT_BACKGROUND, color: "#000000" },
    grid: {
      enabled: true,
      sizeX: 45,
      sizeY: 45,
      shiftX: 0.36,
      shiftY: 0,
      lineColor: "#ffffff",
      lineThickness: 1,
      lineOpacity: 30,
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
      sizeX: 50,
      sizeY: 50,
      shiftX: 0.5,
      shiftY: 0.5,
      lineColor: "#7d7d7d",
      lineThickness: 2,
      lineOpacity: 50,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: true,
      type: "radial",
      radial: {
        rx: 70,
        ry: 80,
        posX: 50,
        posY: 0,
        innerStop: 70,
        outerStop: 110,
      },
    },
    effect: null,
  },
];
