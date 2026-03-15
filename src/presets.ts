import type { Config, Preset } from "./types";

export const DEFAULT_CONFIG: Config = {
  backgroundColor: "#ffffff",
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
};
export const PRESETS: Preset[] = [
  {
    name: "Modern Light",
    backgroundColor: "#ffffff",
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
      linear: {
        angle: -20,
        stop: 50,
      },
    },
  },
  {
    name: "Modern Dark",
    backgroundColor: "#000000",
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
      linear: {
        angle: -20,
        stop: 50,
      },
    },
  },
  {
    name: "Master System",
    backgroundColor: "#ffffff",
    grid: {
      enabled: true,
      size: 50,
      lineColor: "#7d7d7d",
      lineThickness: 2,
      lineOpacity: 50,
    },
    mask: {
      ...DEFAULT_CONFIG.mask,
      enabled: false,
    },
  },
];
