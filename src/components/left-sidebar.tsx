import type { BackgroundConfig, Config } from "@/types";
import { BackgroundControl } from "./background-control";
import { PresetSelector } from "./preset-selector";

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
  return (
    <aside
      data-open={open}
      className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full hidden lg:block"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <h2 className="text-sm font-semibold">Presets</h2>
          <PresetSelector onSelectPreset={onSelectPreset} />
          <h2 className="text-sm font-semibold">Parameters</h2>
          <BackgroundControl background={background} onChange={onChange} />
        </div>
      </div>
    </aside>
  );
}
