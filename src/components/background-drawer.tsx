import { useState, useEffect } from "react";
import { Wallpaper } from "lucide-react";
import type { BackgroundConfig, Config } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { BackgroundControl } from "./background-control";
import { PresetSelector } from "./preset-selector";

interface Props {
  background: BackgroundConfig;
  onChange: (config: Partial<BackgroundConfig>) => void;
  onSelectPreset: (config: Config) => void;
}

export function BackgroundDrawer({ background, onChange, onSelectPreset }: Props) {
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
          <Wallpaper className="size-5" />
          <span className="text-xs font-medium">Background</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Background</DrawerTitle>
          <DrawerDescription>Background settings</DrawerDescription>
        </DrawerHeader>
        <div className="h-full flex flex-col px-8 pb-8 pt-4 overflow-hidden">
          <div className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
            <PresetSelector onSelectPreset={onSelectPreset} />
            <BackgroundControl background={background} onChange={onChange} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
