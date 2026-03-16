import type { BackgroundConfig, BackgroundGradientConfig } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ColorPicker } from "./color-picker";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { SliderControl } from "./slider-control";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface Props {
  open: boolean;
  background: BackgroundConfig;
  onChange: (config: Partial<BackgroundConfig>) => void;
}
export function LeftSidebar({ open, background, onChange }: Props) {
  function patch(p: Partial<BackgroundConfig>) {
    onChange({ ...background, ...p });
  }

  function patchGradient(p: Partial<BackgroundConfig["gradient"]>) {
    onChange({ ...background, gradient: { ...background.gradient, ...p } });
  }

  const { gradient } = background;

  return (
    <aside
      data-open={open}
      className="absolute left-0 top-0 bottom-0 w-70 bg-background/95 backdrop-blur-sm border-r transition-transform duration-300 ease-in-out z-10 translate-x-0 data-[open=false]:-translate-x-full"
    >
      <div className="h-full flex flex-col p-4 overflow-hidden">
        <div className="h-ful overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden @container space-y-4">
          <h2 className="text-md font-semibold">Background</h2>
          <Tabs
            value={background.type}
            onValueChange={(value) => {
              onChange({
                type: value,
              });
            }}
          >
            <TabsList className="grid grid-cols-2 w-full mb-4">
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
              <div className="space-y-2 pt-2">
                <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
                  Colors
                </h3>
                <ColorPicker
                  label="Primary"
                  color={background.color}
                  onColorChange={(v) => patch({ color: v })}
                />
                <ColorPicker
                  label="Secondary"
                  color={background.gradient.color}
                  onColorChange={(v) => patch({ color: v })}
                />
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground">
                  Gradient Style
                </h3>
                <ToggleGroup
                  size="sm"
                  variant="outline"
                  spacing={2}
                  className="grid grid-cols-3 w-full"
                  value={[background.gradient.type]}
                  onValueChange={(value) =>
                    patchGradient({
                      type: value[0] as BackgroundGradientConfig["type"],
                    })
                  }
                >
                  {["linear", "circle", "ellipse"].map((gradientType) => (
                    <ToggleGroupItem
                      key={gradientType}
                      value={gradientType}
                      aria-label={`Toggle ${gradientType}`}
                      className="capitalize"
                    >
                      {gradientType}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <Accordion defaultValue={["parameters"]}>
                <AccordionItem value="parameters">
                  <AccordionTrigger className="py-4 hover:no-underline cursor-pointer">
                    Parameters
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </aside>
  );
}

/*
  Presets
          <div className="relative rounded-md border border-border p-1 group">
            <div className="flex flex-col overflow-visible h-50">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-0 pb-0 min-h-0 grid grid-cols-3 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      handleApplyPreset(preset);
                    }}
                    className="rounded-md border-2 w-full p-1 overflow-hidden transition-all cursor-pointer aspect-square border-transparent hover:border-muted-foreground/50 bg-muted/30 aria-pressed:border-foreground"
                    aria-pressed={preset.name === selectedPreset?.name}
                    title={preset.name}
                  >
                    <img
                      className="w-full h-full object-contain"
                      src="https://efecto.app/thumbnails/duck.png"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          */
