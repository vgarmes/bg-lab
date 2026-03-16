import { useState } from "react";
import { SiteHeader } from "./components/site-header";
import type { BackgroundConfig, Config } from "./types";
import { hexToRgba, computeBackgroundGradient } from "./utils";
import { PRESETS } from "./presets";
import { Grain } from "./components/effects/grain";
import { CRT } from "./components/effects/crt";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";
import { Sparkles, Wallpaper } from "lucide-react";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [config, setConfig] = useState<Config>(PRESETS[0]);

  function setGrid(patch: Partial<Config["grid"]>) {
    setConfig((prev) => ({ ...prev, grid: { ...prev.grid, ...patch } }));
  }

  function setMask(patch: Partial<Config["mask"]>) {
    setConfig((prev) => ({ ...prev, mask: { ...prev.mask, ...patch } }));
  }

  const { background, grid, mask } = config;

  const line = hexToRgba(grid.lineColor, grid.lineOpacity);

  const maskGradient =
    mask.type === "linear"
      ? `linear-gradient(${mask.linear.angle}deg, transparent ${mask.linear.stop}%, white)`
      : `radial-gradient(ellipse ${mask.radial.rx}% ${mask.radial.ry}% at ${mask.radial.posX}% ${mask.radial.posY}%, #000 ${mask.radial.innerStop}%, transparent ${mask.radial.outerStop}%)`;

  const bgStyle: Record<string, string> & React.CSSProperties = {
    "--line": line,
    "--size": grid.size + "px",
    background: grid.enabled
      ? `linear-gradient(90deg,var(--line)1px,transparent 1px var(--size))calc(var(--size)*.36)50%/var(--size)var(--size),
      linear-gradient(var(--line)1px,transparent 1px var(--size))0% calc(var(--size)*.32)/var(--size)var(--size)`
      : "none",
    ...(mask.enabled && {
      WebkitMask: maskGradient,
      mask: maskGradient,
    }),
  };

  const handleBackgroundChange = (values: Partial<BackgroundConfig>) => {
    setConfig({ ...config, background: { ...config.background, ...values } });
  };

  return (
    <div className="h-dvh w-full flex flex-col">
      <SiteHeader
        isPanelOpen={isPanelOpen}
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
      />
      <div className="flex-1 overflow-hidden w-full relative flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <LeftSidebar
            open={isPanelOpen}
            background={config.background}
            onChange={handleBackgroundChange}
          />
          <RightSidebar
            open={isPanelOpen}
            mask={config.mask}
            grid={config.grid}
            effect={config.effect}
            onGridChange={setGrid}
            onMaskChange={setMask}
            onEffectChange={(value) => {
              setConfig({ ...config, effect: value });
            }}
          />

          <div
            className="fixed inset-0 -z-10"
            style={{
              backgroundColor: background.color,
              ...(background.type === "gradient" && {
                backgroundImage: computeBackgroundGradient(background.gradient),
              }),
            }}
          >
            <div className="absolute inset-0" style={bgStyle}></div>
            {config.effect === "grain" && <Grain />}
            {config.effect === "vhs" && <CRT />}
          </div>
        </div>
        <div className="flex lg:hidden items-stretch border-t bg-background">
          <button className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors text-muted-foreground">
            <Wallpaper className="size-5" />
            <span className="text-xs font-medium">Background</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors text-muted-foreground">
            <Sparkles className="size-5" />
            <span className="text-xs font-medium">Effects</span>
          </button>
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
