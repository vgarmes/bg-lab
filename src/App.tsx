import { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Switch } from "./components/ui/switch";
import { SliderControl } from "./components/slider-control";
import { Separator } from "./components/separator";
import { SiteHeader } from "./components/site-header";
import type { LinearMaskSettings, RadialMaskSettings } from "./types";
import { MaskControl } from "./components/mask-control";
import { ColorPicker } from "./components/color-picker";

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [gridSize, setGridSize] = useState(45);
  const [lineColor, setLineColor] = useState("#888888");
  const [lineOpacity, setLineOpacity] = useState(30);

  const [maskEnabled, setMaskEnabled] = useState(true);
  const [maskType, setMaskType] = useState<"linear" | "radial">("linear");

  const [linearMask, setLinearMask] = useState<LinearMaskSettings>({
    angle: -20,
    stop: 50,
  });
  const [radialMask, setRadialMask] = useState<RadialMaskSettings>({
    rx: 80,
    ry: 50,
    posX: 50,
    posY: 0,
    innerStop: 70,
    outerStop: 110,
  });

  const line = hexToRgba(lineColor, lineOpacity);

  const maskGradient =
    maskType === "linear"
      ? `linear-gradient(${linearMask.angle}deg, transparent ${linearMask.stop}%, white)`
      : `radial-gradient(ellipse ${radialMask.rx}% ${radialMask.ry}% at ${radialMask.posX}% ${radialMask.posY}%, #000 ${radialMask.innerStop}%, transparent ${radialMask.outerStop}%)`;

  const bgStyle: React.CSSProperties = {
    background: gridEnabled
      ? `linear-gradient(90deg, ${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px,
         linear-gradient(${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px`
      : "none",
    ...(maskEnabled && {
      WebkitMask: maskGradient,
      mask: maskGradient,
    }),
  };

  return (
    <div className="h-dvh w-full flex flex-col">
      <SiteHeader
        isPanelOpen={isPanelOpen}
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
      />
      <div className="flex-1 overflow-hidden w-full relative flex flex-col">
        <div className="flex-1 relative">
          <aside
            data-open={isPanelOpen}
            className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full"
          >
            <div className="h-full flex flex-col p-4 overflow-hidden">
              <div className="h-ful overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
                <ColorPicker
                  label="Background"
                  color={backgroundColor}
                  onColorChange={setBackgroundColor}
                />

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
                    Grid
                  </h3>
                  <Switch
                    checked={gridEnabled}
                    onCheckedChange={(checked) => setGridEnabled(checked)}
                  />
                </div>
                <SliderControl
                  label="Size"
                  value={gridSize}
                  onValueChange={setGridSize}
                  min={10}
                  max={100}
                  step={1}
                />

                <SliderControl
                  label="Opacity"
                  value={lineOpacity}
                  onValueChange={setLineOpacity}
                  min={0}
                  max={100}
                  step={1}
                />

                <ColorPicker
                  label="Color"
                  color={lineColor}
                  onColorChange={setLineColor}
                />

                <Separator />

                <MaskControl
                  linearMask={linearMask}
                  radialMask={radialMask}
                  maskEnabled={maskEnabled}
                  maskType={maskType}
                  onMaskEnabledChange={setMaskEnabled}
                  onMaskTypeChange={(type) => setMaskType(type)}
                  onLinearMaskChange={setLinearMask}
                  onRadialMaskChange={setRadialMask}
                />
                <Separator />
              </div>
            </div>
          </aside>

          <div className="fixed inset-0 -z-10" style={{ backgroundColor }} />
          <div className="absolute inset-0" style={bgStyle}></div>
        </div>
      </div>
    </div>
  );
}

/*
<div style={bgStyle} aria-hidden="true" />
      <div className="controls-panel">
        <p className="controls-title">bg-lab</p>

        <section className="controls-section">
          <div className="section-header">
            <h4>Grid</h4>
            <label className="toggle">
              <input
                type="checkbox"
                checked={gridEnabled}
                onChange={(e) => setGridEnabled(e.target.checked)}
              />
              {gridEnabled ? "on" : "off"}
            </label>
          </div>
          <div className={gridEnabled ? undefined : "controls-disabled"}>
            <label className="control-row">
              <span>Color</span>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
              />
              <span />
            </label>
            <label className="control-row">
              <span>Opacity</span>
              <input
                type="range"
                min={0}
                max={100}
                value={lineOpacity}
                onChange={(e) => setLineOpacity(Number(e.target.value))}
              />
              <span className="value">{lineOpacity}%</span>
            </label>
          </div>
        </section>

        <section className="controls-section">
          <h4>Gradient Mask</h4>
          <label className="control-row">
            <span>Angle</span>
            <input
              type="range"
              min={-180}
              max={180}
              value={gradientAngle}
              onChange={(e) => setGradientAngle(Number(e.target.value))}
            />
            <span className="value">{gradientAngle}°</span>
          </label>
          <label className="control-row">
            <span>Stop</span>
            <input
              type="range"
              min={0}
              max={100}
              value={gradientStop}
              onChange={(e) => setGradientStop(Number(e.target.value))}
            />
            <span className="value">{gradientStop}%</span>
          </label>
        </section>
        */

export default App;
