import type { BackgroundGradientConfig } from "./types";

export function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export function computeBackgroundGradient(g: BackgroundGradientConfig): string {
  switch (g.type) {
    case "linear":
      return `linear-gradient(${g.linear.angle}deg, ${g.color} ${g.linear.fromStop}%, transparent ${g.linear.toStop}%)`;
    case "circle":
      return `radial-gradient(circle ${g.circle.radius}px at ${g.circle.posX}% ${g.circle.posY}%, ${g.color} ${g.circle.fromStop}%, transparent ${g.circle.toStop}%)`;
    case "ellipse":
      return `radial-gradient(ellipse ${g.ellipse.rx}% ${g.ellipse.ry}% at ${g.ellipse.posX}% ${g.ellipse.posY}%, ${g.color} ${g.ellipse.fromStop}%, transparent ${g.ellipse.toStop}%)`;
  }
}
