import type { BackgroundConfig } from "@/types";
import { ColorPicker } from "./color-picker";
import { SliderControl } from "./slider-control";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  background: BackgroundConfig;
  onChange: (bg: BackgroundConfig) => void;
}

export function BackgroundControl({ background, onChange }: Props) {
  function patch(p: Partial<BackgroundConfig>) {
    onChange({ ...background, ...p });
  }

  function patchGradient(p: Partial<BackgroundConfig["gradient"]>) {
    onChange({ ...background, gradient: { ...background.gradient, ...p } });
  }

  const { gradient } = background;

  return (
    <Tabs
      value={background.type}
      onValueChange={(v) => patch({ type: v as BackgroundConfig["type"] })}
      className="space-y-4"
    >
      <TabsList className="w-full">
        <TabsTrigger value="solid">Solid</TabsTrigger>
        <TabsTrigger value="gradient">Gradient</TabsTrigger>
      </TabsList>

      <TabsContent value="solid">
        <ColorPicker
          label="Color"
          color={background.color}
          onColorChange={(v) => patch({ color: v })}
        />
      </TabsContent>

      <TabsContent value="gradient" className="space-y-4">
        <ColorPicker
          label="Color"
          color={background.color}
          onColorChange={(v) => patch({ color: v })}
        />

        <>
          <Select
            value={gradient.type}
            onValueChange={(v) =>
              patchGradient({ type: v as BackgroundConfig["gradient"]["type"] })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue className="capitalize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="ellipse">Ellipse</SelectItem>
            </SelectContent>
          </Select>

          <ColorPicker
            label="Gradient"
            color={gradient.color}
            onColorChange={(v) => patchGradient({ color: v })}
          />

          {gradient.type === "linear" && (
            <>
              <SliderControl
                label="Angle"
                value={gradient.linear.angle}
                onValueChange={(v) =>
                  patchGradient({ linear: { ...gradient.linear, angle: v } })
                }
                min={-180}
                max={180}
                step={1}
              />
              <SliderControl
                label="From"
                value={gradient.linear.fromStop}
                onValueChange={(v) =>
                  patchGradient({ linear: { ...gradient.linear, fromStop: v } })
                }
                min={0}
                max={150}
                step={1}
              />
              <SliderControl
                label="To"
                value={gradient.linear.toStop}
                onValueChange={(v) =>
                  patchGradient({ linear: { ...gradient.linear, toStop: v } })
                }
                min={0}
                max={150}
                step={1}
              />
            </>
          )}

          {gradient.type === "circle" && (
            <>
              <SliderControl
                label="Radius"
                value={gradient.circle.radius}
                onValueChange={(v) =>
                  patchGradient({ circle: { ...gradient.circle, radius: v } })
                }
                min={0}
                max={2000}
                step={10}
              />
              <SliderControl
                label="Pos X"
                value={gradient.circle.posX}
                onValueChange={(v) =>
                  patchGradient({ circle: { ...gradient.circle, posX: v } })
                }
                min={0}
                max={100}
                step={1}
              />
              <SliderControl
                label="Pos Y"
                value={gradient.circle.posY}
                onValueChange={(v) =>
                  patchGradient({ circle: { ...gradient.circle, posY: v } })
                }
                min={0}
                max={100}
                step={1}
              />
              <SliderControl
                label="From"
                value={gradient.circle.fromStop}
                onValueChange={(v) =>
                  patchGradient({
                    circle: { ...gradient.circle, fromStop: v },
                  })
                }
                min={0}
                max={150}
                step={1}
              />
              <SliderControl
                label="To"
                value={gradient.circle.toStop}
                onValueChange={(v) =>
                  patchGradient({ circle: { ...gradient.circle, toStop: v } })
                }
                min={0}
                max={150}
                step={1}
              />
            </>
          )}

          {gradient.type === "ellipse" && (
            <>
              <SliderControl
                label="Rx"
                value={gradient.ellipse.rx}
                onValueChange={(v) =>
                  patchGradient({ ellipse: { ...gradient.ellipse, rx: v } })
                }
                min={0}
                max={200}
                step={1}
              />
              <SliderControl
                label="Ry"
                value={gradient.ellipse.ry}
                onValueChange={(v) =>
                  patchGradient({ ellipse: { ...gradient.ellipse, ry: v } })
                }
                min={0}
                max={200}
                step={1}
              />
              <SliderControl
                label="Pos X"
                value={gradient.ellipse.posX}
                onValueChange={(v) =>
                  patchGradient({ ellipse: { ...gradient.ellipse, posX: v } })
                }
                min={0}
                max={100}
                step={1}
              />
              <SliderControl
                label="Pos Y"
                value={gradient.ellipse.posY}
                onValueChange={(v) =>
                  patchGradient({ ellipse: { ...gradient.ellipse, posY: v } })
                }
                min={0}
                max={100}
                step={1}
              />
              <SliderControl
                label="From"
                value={gradient.ellipse.fromStop}
                onValueChange={(v) =>
                  patchGradient({
                    ellipse: { ...gradient.ellipse, fromStop: v },
                  })
                }
                min={0}
                max={150}
                step={1}
              />
              <SliderControl
                label="To"
                value={gradient.ellipse.toStop}
                onValueChange={(v) =>
                  patchGradient({
                    ellipse: { ...gradient.ellipse, toStop: v },
                  })
                }
                min={0}
                max={150}
                step={1}
              />
            </>
          )}
        </>
      </TabsContent>
    </Tabs>
  );
}
