import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import type { GridConfig, MaskConfig, Effect } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { GridControl } from "./grid-control";
import { MaskControl } from "./mask-control";
import { EffectControl } from "./effect-control";
import { Separator } from "./separator";

interface Props {
  grid: GridConfig;
  onGridChange: (patch: Partial<GridConfig>) => void;
  mask: MaskConfig;
  onMaskChange: (patch: Partial<MaskConfig>) => void;
  effect: Effect | null;
  onEffectChange: (value: Effect | null) => void;
}

export function EffectsDrawer({
  grid,
  onGridChange,
  mask,
  onMaskChange,
  effect,
  onEffectChange,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors text-muted-foreground">
          <Sparkles className="size-5" />
          <span className="text-xs font-medium">Effects</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Effects</DrawerTitle>
          <DrawerDescription>Effects settings</DrawerDescription>
        </DrawerHeader>
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
      </DrawerContent>
    </Drawer>
  );
}
