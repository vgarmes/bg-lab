import { useState } from "react";
import { SiteHeader } from "./components/site-header";
import type { BackgroundConfig, Config } from "./types";
import { PRESETS } from "./presets";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";
import { Background } from "./components/background";
import { BackgroundDrawer } from "./components/background-drawer";
import { EffectsDrawer } from "./components/effects-drawer";

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
            onSelectPreset={setConfig}
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

          <Background
            background={config.background}
            grid={config.grid}
            mask={config.mask}
            effect={config.effect}
          />
        </div>
        <div className="flex lg:hidden items-stretch border-t bg-background">
          <BackgroundDrawer
            background={background}
            onChange={handleBackgroundChange}
            onSelectPreset={setConfig}
          />
          <EffectsDrawer
            grid={grid}
            onGridChange={setGrid}
            mask={mask}
            onMaskChange={setMask}
            effect={config.effect}
            onEffectChange={(value) => setConfig({ ...config, effect: value })}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
