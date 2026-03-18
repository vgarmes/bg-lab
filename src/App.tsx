import { useState } from "react";
import { SiteHeader } from "./components/site-header";
import type { BackgroundConfig, Config } from "./types";
import { PRESETS } from "./presets";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";
import { Sparkles, Wallpaper } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";
import { BackgroundControl } from "./components/background-control";
import { GridControl } from "./components/grid-control";
import { Separator } from "./components/separator";
import { MaskControl } from "./components/mask-control";
import { EffectControl } from "./components/effect-control";
import { Background } from "./components/background";

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
          <Drawer>
            <DrawerTrigger asChild>
              <button className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors text-muted-foreground">
                <Wallpaper className="size-5" />
                <span className="text-xs font-medium">Background</span>
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="sr-only">
                <DrawerTitle>Background</DrawerTitle>
                <DrawerDescription>Background settings</DrawerDescription>
              </DrawerHeader>
              <div className="h-full flex flex-col px-8 pb-8 pt-4 overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
                  <h2 className="text-md font-semibold">Background</h2>
                  <BackgroundControl
                    background={background}
                    onChange={handleBackgroundChange}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <button className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors text-muted-foreground">
                <Sparkles className="size-5" />
                <span className="text-xs font-medium">Effects</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <DrawerHeader className="sr-only">
                <DrawerTitle>Background</DrawerTitle>
                <DrawerDescription>Background settings</DrawerDescription>
              </DrawerHeader>
              <div className="h-full flex flex-col p-4 overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
                  <h2 className="text-md font-semibold">Effects</h2>
                  <GridControl grid={grid} onChange={setGrid} />
                  <Separator />
                  <MaskControl mask={mask} onMaskChange={setMask} />
                  <Separator />
                  <EffectControl
                    effect={config.effect}
                    onChange={(value) => {
                      setConfig({ ...config, effect: value });
                    }}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default App;
