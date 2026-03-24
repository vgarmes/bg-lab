import type { BackgroundConfig, Config } from "@/types";
import { BackgroundControl } from "./background-control";
import { PRESETS } from "@/presets";
import { useState } from "react";
import { Background } from "./background";

interface Props {
  open: boolean;
  background: BackgroundConfig;
  onChange: (config: Partial<BackgroundConfig>) => void;
  onSelectPreset: (config: Config) => void;
}
export function LeftSidebar({
  open,
  background,
  onChange,
  onSelectPreset,
}: Props) {
  const [selectedPresetName, setSelectedPresetName] = useState<string | null>(
    null,
  );
  return (
    <aside
      data-open={open}
      className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full hidden lg:block"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <h2 className="text-sm font-semibold">Presets</h2>
          <div className="relative rounded-md border border-border p-1 group">
            <div className="flex flex-col overflow-visible h-50">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-0 pb-0 min-h-0 grid grid-cols-3 gap-2 content-start">
                {PRESETS.map((preset) => (
                  <div
                    key={preset.name}
                    className="relative w-full aspect-square overflow-hidden rounded-md"
                  >
                    <button
                      key={preset.name}
                      onClick={() => {
                        onSelectPreset(preset);
                        setSelectedPresetName(preset.name);
                      }}
                      className="rounded-md border-2 absolute inset-0 p-1 overflow-hidden transition-all cursor-pointer  border-transparent hover:border-muted-foreground/50 bg-muted/30 aria-pressed:border-foreground"
                      aria-pressed={preset.name === selectedPresetName}
                      title={preset.name}
                    />
                    <Background
                      className="absolute"
                      background={preset.background}
                      grid={preset.grid}
                      mask={preset.mask}
                      effect={preset.effect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-sm font-semibold">Parameters</h2>
          <BackgroundControl background={background} onChange={onChange} />
        </div>
      </div>
    </aside>
  );
}
