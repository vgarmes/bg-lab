import { EFFECT_OPTIONS } from "@/presets";
import { MaskControl } from "./mask-control";
import { Separator } from "./separator";
import { SliderControl } from "./slider-control";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { ColorPicker } from "./color-picker";
import type { Effect, GridConfig, MaskConfig } from "@/types";

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
      className="absolute right-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:translate-x-full"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
              Grid
            </h3>
            <Switch
              checked={grid.enabled}
              onCheckedChange={(checked) => onGridChange({ enabled: checked })}
            />
          </div>
          <SliderControl
            label="Size"
            value={grid.size}
            onValueChange={(v) => onGridChange({ size: v })}
            min={10}
            max={100}
            step={1}
          />

          <SliderControl
            label="Thickness"
            value={grid.lineThickness}
            onValueChange={(v) => onGridChange({ lineThickness: v })}
            min={1}
            max={10}
            step={1}
          />

          <SliderControl
            label="Opacity"
            value={grid.lineOpacity}
            onValueChange={(v) => onGridChange({ lineOpacity: v })}
            min={0}
            max={100}
            step={1}
          />

          <ColorPicker
            label="Color"
            color={grid.lineColor}
            onColorChange={(v) => onGridChange({ lineColor: v })}
          />

          <Separator />

          <MaskControl
            linearMask={mask.linear}
            radialMask={mask.radial}
            maskEnabled={mask.enabled}
            maskType={mask.type}
            onMaskEnabledChange={(v) => onMaskChange({ enabled: v })}
            onMaskTypeChange={(v) => onMaskChange({ type: v })}
            onLinearMaskChange={(v) => onMaskChange({ linear: v })}
            onRadialMaskChange={(v) => onMaskChange({ radial: v })}
          />
          <Separator />

          <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
            Filter
          </h3>

          <Select
            value={effect}
            onValueChange={(value) => value !== null && onEffectChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {EFFECT_OPTIONS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}
