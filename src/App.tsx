import { useState } from "react";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function App() {
  const [gridEnabled, setGridEnabled] = useState(true);
  const [gridSize, setGridSize] = useState(45);
  const [lineColor, setLineColor] = useState("#888888");
  const [lineOpacity, setLineOpacity] = useState(30);
  const [gradientAngle, setGradientAngle] = useState(-20);
  const [gradientStop, setGradientStop] = useState(50);

  const line = hexToRgba(lineColor, lineOpacity);

  const bgStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: -1,
    pointerEvents: "none",
    background: gridEnabled
      ? `linear-gradient(90deg, ${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px,
         linear-gradient(${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px`
      : "none",
    WebkitMask: `linear-gradient(${gradientAngle}deg, transparent ${gradientStop}%, white)`,
    mask: `linear-gradient(${gradientAngle}deg, transparent ${gradientStop}%, white)`,
  };

  return (
    <div className="h-dvh w-full flex flex-col">
      <header className="border-b flex items-center justify-between px-4 sticky top-0 z-50 bg-background backdrop-blur-sm h-(--header-height)"></header>
      <div className="flex-1 overflow-hidden w-full relative flex flex-col">
        <div className="flex-1 relative">
          <aside className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full">
            <div className="p-4 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="grid-size"
                  className="text-muted-foreground font-normal text-sm flex-nowrap shrink-0"
                >
                  Grid Size
                </Label>
                <Slider
                  min={10}
                  max={100}
                  step={1}
                  value={gridSize}
                  onValueChange={(value) => setGridSize(value as number)}
                  className="w-full"
                />
                <Input
                  value={gridSize}
                  type="number"
                  min={10}
                  max={100}
                  step={1}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-20"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="grid-color"
                  className="text-muted-foreground font-normal text-sm flex-nowrap shrink-0"
                >
                  Grid color
                </Label>
                <div className="relative">
                  <Input
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 border-0 cursor-pointer p-0 h-6 w-6"
                  />
                  <Input
                    className="pl-10"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </aside>
          <div style={bgStyle}></div>
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
