import type { BackgroundConfig } from "@/types";
import { BackgroundControl } from "./background-control";

interface Props {
  open: boolean;
  background: BackgroundConfig;
  onChange: (config: Partial<BackgroundConfig>) => void;
}
export function LeftSidebar({ open, background, onChange }: Props) {
  return (
    <aside
      data-open={open}
      className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full hidden lg:block"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <h2 className="text-md font-semibold">Background</h2>
          <BackgroundControl background={background} onChange={onChange} />
        </div>
      </div>
    </aside>
  );
}

/*
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
          */
