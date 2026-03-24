import type { BackgroundConfig, BackgroundGradientConfig } from "@/types";
import { ColorPicker } from "./color-picker";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { SliderControl } from "./slider-control";
import { Switch } from "./ui/switch";
import { Separator } from "./separator";

interface Props {
  background: BackgroundConfig;
  onChange: (config: Partial<BackgroundConfig>) => void;
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
    <>
      <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
        Colors
      </h3>
      <ColorPicker
        label="Background"
        color={background.color}
        onColorChange={(v) => patch({ color: v })}
      />

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
            Gradient
          </h3>
          <Switch
            checked={background.type === "gradient"}
            onCheckedChange={(checked) =>
              patch({ type: checked ? "gradient" : "solid" })
            }
          />
        </div>

        <ColorPicker
          label="Color"
          color={gradient.color}
          onColorChange={(v) => patchGradient({ color: v })}
        />
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs text-muted-foreground mb-1.5 block">Style</h4>
        <ToggleGroup
          size="sm"
          variant="outline"
          spacing={2}
          className="grid grid-cols-3 w-full"
          value={[gradient.type]}
          onValueChange={(value) =>
            patchGradient({
              type: value[0] as BackgroundGradientConfig["type"],
            })
          }
        >
          {(["linear", "circle", "ellipse"] as const).map((t) => (
            <ToggleGroupItem
              key={t}
              value={t}
              aria-label={`Toggle ${t}`}
              className="capitalize"
            >
              {t}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {gradient.type === "linear" && (
        <>
          <SliderControl
            label="Angle"
            value={gradient.linear.angle}
            onValueChange={(v) =>
              patchGradient({
                linear: { ...gradient.linear, angle: v },
              })
            }
            min={-180}
            max={180}
            step={1}
          />
          <SliderControl
            label="From"
            value={gradient.linear.fromStop}
            onValueChange={(v) =>
              patchGradient({
                linear: { ...gradient.linear, fromStop: v },
              })
            }
            min={0}
            max={150}
            step={1}
          />
          <SliderControl
            label="To"
            value={gradient.linear.toStop}
            onValueChange={(v) =>
              patchGradient({
                linear: { ...gradient.linear, toStop: v },
              })
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
              patchGradient({
                circle: { ...gradient.circle, radius: v },
              })
            }
            min={0}
            max={2000}
            step={10}
          />
          <SliderControl
            label="Pos X"
            value={gradient.circle.posX}
            onValueChange={(v) =>
              patchGradient({
                circle: { ...gradient.circle, posX: v },
              })
            }
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Pos Y"
            value={gradient.circle.posY}
            onValueChange={(v) =>
              patchGradient({
                circle: { ...gradient.circle, posY: v },
              })
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
              patchGradient({
                circle: { ...gradient.circle, toStop: v },
              })
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
              patchGradient({
                ellipse: { ...gradient.ellipse, rx: v },
              })
            }
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Ry"
            value={gradient.ellipse.ry}
            onValueChange={(v) =>
              patchGradient({
                ellipse: { ...gradient.ellipse, ry: v },
              })
            }
            min={0}
            max={200}
            step={1}
          />
          <SliderControl
            label="Pos X"
            value={gradient.ellipse.posX}
            onValueChange={(v) =>
              patchGradient({
                ellipse: { ...gradient.ellipse, posX: v },
              })
            }
            min={0}
            max={100}
            step={1}
          />
          <SliderControl
            label="Pos Y"
            value={gradient.ellipse.posY}
            onValueChange={(v) =>
              patchGradient({
                ellipse: { ...gradient.ellipse, posY: v },
              })
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
  );
}
