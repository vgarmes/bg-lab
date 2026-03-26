import { PRESETS } from "@/presets";
import type { Config } from "@/types";
import { useState } from "react";
import { Background } from "./background";

interface Props {
  onSelectPreset: (config: Config) => void;
}

export function PresetSelector({ onSelectPreset }: Props) {
  const [selectedPresetName, setSelectedPresetName] = useState<string | null>(
    PRESETS[0].name,
  );
  return (
    <div className="relative rounded-md border border-border p-1 group">
      <div className="flex flex-col overflow-visible h-50">
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-0 pb-0 min-h-0 grid grid-cols-3 gap-2 content-start">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                onSelectPreset(preset);
                setSelectedPresetName(preset.name);
              }}
              className="w-full aspect-square border-2 relative rounded-md p-1 overflow-hidden transition-all cursor-pointer  border-transparent hover:border-muted-foreground/50 bg-muted/30 aria-pressed:border-foreground"
              aria-pressed={preset.name === selectedPresetName}
              title={preset.name}
            >
              <div
                className="absolute inset-0 origin-top-left pointer-events-none"
                style={{
                  width: `${100 / 0.5}%`,
                  height: `${100 / 0.5}%`,
                  transform: `scale(0.5)`,
                }}
              >
                <Background
                  background={preset.background}
                  grid={preset.grid}
                  mask={preset.mask}
                  effect={preset.effect}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
