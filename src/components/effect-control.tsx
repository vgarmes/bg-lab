import { EFFECT_OPTIONS } from "@/presets";
import type { Effect } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  effect: Effect | null;
  onChange: (value: Effect) => void;
}

export function EffectControl({ effect, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
        Filter
      </h3>
      <Select
        value={effect ?? undefined}
        onValueChange={(v) => onChange(v as Effect)}
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
  );
}
