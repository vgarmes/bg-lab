import { useId } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
}
export function ColorPicker({ label, color, onColorChange }: Props) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor={id}
        className="text-muted-foreground font-normal text-sm flex-nowrap shrink-0 min-w-20"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="absolute left-2 top-1/2 -translate-y-1/2 border-0 cursor-pointer p-0 h-6 w-6"
        />
        <Input
          id={id}
          className="pl-10 uppercase"
          maxLength={9}
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
    </div>
  );
}
