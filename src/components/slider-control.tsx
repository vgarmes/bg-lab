import { useId } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface Props {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export function SliderControl({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
}: Props) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor={id}
        className="text-muted-foreground font-normal text-sm flex-nowrap shrink-0 min-w-20"
      >
        {label}
      </Label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(value) => onValueChange(value as number)}
        className="w-full"
      />
      <Input
        id={id}
        value={value}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12.5 px-1.5 shrink-0"
      />
    </div>
  );
}
