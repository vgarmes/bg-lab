import type {
  LinearMaskSettings,
  MaskConfig,
  RadialMaskSettings,
} from "@/types";
import { SliderControl } from "./slider-control";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  mask: MaskConfig;
  onMaskChange: (value: Partial<MaskConfig>) => void;
}
export function MaskControl({ mask, onMaskChange }: Props) {
  const { enabled, type, linear, radial } = mask;

  const handleLinearMaskChange = (values: Partial<LinearMaskSettings>) => {
    onMaskChange({ linear: { ...mask.linear, ...values } });
  };

  const handleRadialMaskChange = (values: Partial<RadialMaskSettings>) => {
    onMaskChange({ radial: { ...mask.radial, ...values } });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
          Fade
        </h3>
        <Switch
          id="mask-enable"
          checked={enabled}
          onCheckedChange={(checked) => {
            onMaskChange({ enabled: checked });
          }}
        />
      </div>

      <Tabs
        value={type}
        onValueChange={(value) => {
          onMaskChange({ type: value });
        }}
        className="space-y-2"
      >
        <TabsList className="w-full">
          <TabsTrigger value="linear">Linear</TabsTrigger>
          <TabsTrigger value="radial">Radial</TabsTrigger>
        </TabsList>
        <TabsContent value="linear" className="space-y-4">
          <SliderControl
            label="Direction"
            value={linear.angle}
            onValueChange={(value) => handleLinearMaskChange({ angle: value })}
            min={-180}
            max={180}
            step={1}
          />
          <SliderControl
            label="Start"
            value={linear.stop}
            onValueChange={(value) => handleLinearMaskChange({ stop: value })}
            min={0}
            max={100}
            step={1}
          />
        </TabsContent>
        <TabsContent value="radial" className="space-y-4">
          <SliderControl
            label="Rx"
            value={radial.rx}
            onValueChange={(value) => handleRadialMaskChange({ rx: value })}
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Ry"
            value={radial.ry}
            onValueChange={(value) => handleRadialMaskChange({ ry: value })}
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Pos X"
            value={radial.posX}
            onValueChange={(value) => handleRadialMaskChange({ posX: value })}
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Pos Y"
            value={radial.posY}
            onValueChange={(value) => handleRadialMaskChange({ posY: value })}
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Inner"
            value={radial.innerStop}
            onValueChange={(value) =>
              handleRadialMaskChange({ innerStop: value })
            }
            min={0}
            max={150}
            step={1}
          />
          <SliderControl
            label="Outer"
            value={radial.outerStop}
            onValueChange={(value) =>
              handleRadialMaskChange({ outerStop: value })
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
