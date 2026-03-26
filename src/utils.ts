import type { BackgroundGradientConfig, GridConfig, MaskConfig } from "./types";

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

export function getLinearMaskStyle({
  angle,
  stop,
}: {
  angle: number;
  stop: number;
}) {
  return `linear-gradient(${angle}deg, transparent ${stop}%, white)`;
}

export function getEllipseMaskSyle({
  rx,
  ry,
  posX,
  posY,
  innerStop,
  outerStop,
}: {
  rx: number;
  ry: number;
  posX: number;
  posY: number;
  innerStop: number;
  outerStop: number;
}) {
  return `radial-gradient(ellipse ${rx}% ${ry}% at ${posX}% ${posY}%, #000 ${innerStop}%, transparent ${outerStop}%)`;
}

export function getGridStyle({
  mask,
  grid,
}: {
  mask: MaskConfig;
  grid: GridConfig;
}) {
  const line = hexToRgba(grid.lineColor, grid.lineOpacity);

  const maskGradient =
    mask.type === "linear"
      ? getLinearMaskStyle({
          angle: mask.linear.angle,
          stop: mask.linear.stop,
        })
      : getEllipseMaskSyle({
          rx: mask.radial.rx,
          ry: mask.radial.ry,
          innerStop: mask.radial.innerStop,
          outerStop: mask.radial.outerStop,
          posX: mask.radial.posX,
          posY: mask.radial.posY,
        });

  return {
    "--line": line,
    "--sx": grid.sizeX + "px",
    "--sy": grid.sizeY + "px",
    background: grid.enabled
      ? grid.shape === "dots"
        ? `radial-gradient(circle,var(--line)${grid.lineThickness}px,transparent ${grid.lineThickness}px) calc(var(--sx)*${grid.shiftX}) calc(var(--sy)*${grid.shiftY})/var(--sx)var(--sy)`
        : `linear-gradient(90deg,var(--line)1px,transparent 1px var(--sx))calc(var(--sx)*${grid.shiftX})50%/var(--sx)var(--sy),linear-gradient(var(--line)1px,transparent 1px var(--sy))0% calc(var(--sy)*${grid.shiftY})/var(--sx)var(--sy)`
      : "none",
    ...(mask.enabled && {
      WebkitMask: maskGradient,
      mask: maskGradient,
    }),
  } satisfies Record<string, string> & React.CSSProperties;
}
