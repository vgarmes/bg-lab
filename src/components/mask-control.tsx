import type { LinearMaskSettings, RadialMaskSettings } from "@/types";
import { SliderControl } from "./slider-control";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  maskEnabled: boolean;
  onMaskEnabledChange: (enabled: boolean) => void;
  maskType: "linear" | "radial";
  onMaskTypeChange: (type: "linear" | "radial") => void;
  linearMask: LinearMaskSettings;
  onLinearMaskChange: (settings: LinearMaskSettings) => void;
  radialMask: RadialMaskSettings;
  onRadialMaskChange: (settings: RadialMaskSettings) => void;
}
export function MaskControl({
  maskEnabled,
  onMaskEnabledChange,
  maskType,
  onMaskTypeChange,
  linearMask,
  onLinearMaskChange,
  radialMask,
  onRadialMaskChange,
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
          Fade
        </h3>
        <Switch
          id="mask-enable"
          checked={maskEnabled}
          onCheckedChange={onMaskEnabledChange}
        />
      </div>

      <Tabs
        value={maskType}
        onValueChange={onMaskTypeChange}
        className="space-y-2"
      >
        <TabsList className="w-full">
          <TabsTrigger value="linear">Linear</TabsTrigger>
          <TabsTrigger value="radial">Radial</TabsTrigger>
        </TabsList>
        <TabsContent value="linear" className="space-y-4">
          <SliderControl
            label="Direction"
            value={linearMask.angle}
            onValueChange={(value) =>
              onLinearMaskChange({ ...linearMask, angle: value })
            }
            min={-180}
            max={180}
            step={1}
          />
          <SliderControl
            label="Start"
            value={linearMask.stop}
            onValueChange={(value) =>
              onLinearMaskChange({ ...linearMask, stop: value })
            }
            min={0}
            max={100}
            step={1}
          />
        </TabsContent>
        <TabsContent value="radial" className="space-y-4">
          <SliderControl
            label="Rx"
            value={radialMask.rx}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, rx: value })
            }
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Ry"
            value={radialMask.ry}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, ry: value })
            }
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Pos X"
            value={radialMask.posX}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, posX: value })
            }
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Pos Y"
            value={radialMask.posY}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, posY: value })
            }
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Inner"
            value={radialMask.innerStop}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, innerStop: value })
            }
            min={0}
            max={150}
            step={1}
          />
          <SliderControl
            label="Outer"
            value={radialMask.outerStop}
            onValueChange={(value) =>
              onRadialMaskChange({ ...radialMask, outerStop: value })
            }
            min={0}
            max={150}
            step={1}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
