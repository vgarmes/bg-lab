import type { GridConfig } from "@/types";
import { ColorPicker } from "./color-picker";
import { SliderControl } from "./slider-control";
import { Switch } from "./ui/switch";

interface Props {
  grid: GridConfig;
  onChange: (patch: Partial<GridConfig>) => void;
}

export function GridControl({ grid, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
          Grid
        </h3>
        <Switch
          checked={grid.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
        />
      </div>
      <SliderControl
        label="Size X"
        value={grid.sizeX}
        onValueChange={(v) => onChange({ sizeX: v })}
        min={10}
        max={200}
        step={1}
      />
      <SliderControl
        label="Size Y"
        value={grid.sizeY}
        onValueChange={(v) => onChange({ sizeY: v })}
        min={10}
        max={200}
        step={1}
      />
      <SliderControl
        label="Shift X"
        value={grid.shiftX}
        onValueChange={(v) => onChange({ shiftX: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderControl
        label="Shift Y"
        value={grid.shiftY}
        onValueChange={(v) => onChange({ shiftY: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderControl
        label="Thickness"
        value={grid.lineThickness}
        onValueChange={(v) => onChange({ lineThickness: v })}
        min={1}
        max={10}
        step={1}
      />
      <SliderControl
        label="Opacity"
        value={grid.lineOpacity}
        onValueChange={(v) => onChange({ lineOpacity: v })}
        min={0}
        max={100}
        step={1}
      />
      <ColorPicker
        label="Color"
        color={grid.lineColor}
        onColorChange={(v) => onChange({ lineColor: v })}
      />
    </div>
  );
}
