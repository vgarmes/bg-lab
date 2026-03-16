import type { Effect, GridConfig, MaskConfig } from "@/types";
import { EffectControl } from "./effect-control";
import { GridControl } from "./grid-control";
import { MaskControl } from "./mask-control";
import { Separator } from "./separator";

interface Props {
  open: boolean;
  grid: GridConfig;
  mask: MaskConfig;
  effect: Effect | null;
  onGridChange: (values: Partial<GridConfig>) => void;
  onMaskChange: (values: Partial<MaskConfig>) => void;
  onEffectChange: (value: Effect) => void;
}

export function RightSidebar({
  open,
  grid,
  mask,
  effect,
  onGridChange,
  onMaskChange,
  onEffectChange,
}: Props) {
  return (
    <aside
      data-open={open}
      className="absolute right-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:translate-x-full hidden lg:block"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <h2 className="text-md font-semibold">Effects</h2>
          <GridControl grid={grid} onChange={onGridChange} />
          <Separator />
          <MaskControl mask={mask} onMaskChange={onMaskChange} />
          <Separator />
          <EffectControl effect={effect} onChange={onEffectChange} />
        </div>
      </div>
    </aside>
  );
}
