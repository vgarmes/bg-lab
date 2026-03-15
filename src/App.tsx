import { useState } from "react";
import { Switch } from "./components/ui/switch";
import { SliderControl } from "./components/slider-control";
import { Separator } from "./components/separator";
import { SiteHeader } from "./components/site-header";
import type { Config, Preset } from "./types";
import { MaskControl } from "./components/mask-control";
import { ColorPicker } from "./components/color-picker";
import { hexToRgba } from "./utils";
import { DEFAULT_CONFIG, PRESETS } from "./presets";

function App() {
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  function setGrid(patch: Partial<Config["grid"]>) {
    setConfig((prev) => ({ ...prev, grid: { ...prev.grid, ...patch } }));
  }

  function setMask(patch: Partial<Config["mask"]>) {
    setConfig((prev) => ({ ...prev, mask: { ...prev.mask, ...patch } }));
  }

  const { backgroundColor, grid, mask } = config;

  const line = hexToRgba(grid.lineColor, grid.lineOpacity);

  const maskGradient =
    mask.type === "linear"
      ? `linear-gradient(${mask.linear.angle}deg, transparent ${mask.linear.stop}%, white)`
      : `radial-gradient(ellipse ${mask.radial.rx}% ${mask.radial.ry}% at ${mask.radial.posX}% ${mask.radial.posY}%, #000 ${mask.radial.innerStop}%, transparent ${mask.radial.outerStop}%)`;

  const bgStyle: React.CSSProperties = {
    background: grid.enabled
      ? `linear-gradient(90deg, ${line} ${grid.lineThickness}px, transparent ${grid.lineThickness}px ${grid.size}px) 50% 50% / ${grid.size}px ${grid.size}px,
         linear-gradient(${line} ${grid.lineThickness}px, transparent ${grid.lineThickness}px ${grid.size}px) 50% 50% / ${grid.size}px ${grid.size}px`
      : "none",
    ...(mask.enabled && {
      WebkitMask: maskGradient,
      mask: maskGradient,
    }),
  };

  const handleApplyPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    const { name: _name, ...presetConfig } = preset;
    setConfig(presetConfig);
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
                Presets
                <div className="relative rounded-md border border-border p-1 group">
                  <div className="flex flex-col overflow-visible h-50">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden px-0 pb-0 min-h-0 grid grid-cols-3 gap-2">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            handleApplyPreset(preset);
                          }}
                          className="rounded-md border-2 w-full p-1 overflow-hidden transition-all cursor-pointer aspect-square border-transparent hover:border-muted-foreground/50 bg-muted/30 aria-pressed:border-foreground"
                          aria-pressed={preset.name === selectedPreset?.name}
                          title={preset.name}
                        >
                          <img
                            className="w-full h-full object-contain"
                            src="https://efecto.app/thumbnails/duck.png"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <aside
            data-open={isPanelOpen}
            className="absolute right-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:translate-x-full"
          >
            <div className="h-full flex flex-col p-4 overflow-hidden">
              <div className="h-ful overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
                <ColorPicker
                  label="Background"
                  color={backgroundColor}
                  onColorChange={(v) => setConfig((prev) => ({ ...prev, backgroundColor: v }))}
                />

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
                    Grid
                  </h3>
                  <Switch
                    checked={grid.enabled}
                    onCheckedChange={(checked) => setGrid({ enabled: checked })}
                  />
                </div>
                <SliderControl
                  label="Size"
                  value={grid.size}
                  onValueChange={(v) => setGrid({ size: v })}
                  min={10}
                  max={100}
                  step={1}
                />

                <SliderControl
                  label="Thickness"
                  value={grid.lineThickness}
                  onValueChange={(v) => setGrid({ lineThickness: v })}
                  min={1}
                  max={10}
                  step={1}
                />

                <SliderControl
                  label="Opacity"
                  value={grid.lineOpacity}
                  onValueChange={(v) => setGrid({ lineOpacity: v })}
                  min={0}
                  max={100}
                  step={1}
                />

                <ColorPicker
                  label="Color"
                  color={grid.lineColor}
                  onColorChange={(v) => setGrid({ lineColor: v })}
                />

                <Separator />

                <MaskControl
                  linearMask={mask.linear}
                  radialMask={mask.radial}
                  maskEnabled={mask.enabled}
                  maskType={mask.type}
                  onMaskEnabledChange={(v) => setMask({ enabled: v })}
                  onMaskTypeChange={(v) => setMask({ type: v })}
                  onLinearMaskChange={(v) => setMask({ linear: v })}
                  onRadialMaskChange={(v) => setMask({ radial: v })}
                />
                <Separator />
              </div>
            </div>
          </aside>

          <div className="fixed inset-0 -z-10" style={{ backgroundColor }}>
            <div className="absolute inset-0" style={bgStyle}></div>
          </div>
          <div className="w-full h-full px-12 flex items-center justify-center">
            <h1 className="text-6xl font-medium text-black">
              Background Design Tool
            </h1>
          </div>
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
