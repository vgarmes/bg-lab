import type { Config } from "@/types";
import { computeBackgroundGradient, getGridStyle } from "@/utils";
import { Grain } from "./effects/grain";
import { CRT } from "./effects/crt";

export function Background({ background, effect, grid, mask }: Config) {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundColor: background.color,
      }}
    >
      {grid.enabled && (
        <div
          className="absolute inset-0"
          style={getGridStyle({ grid, mask })}
        ></div>
      )}
      {background.type === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: computeBackgroundGradient(background.gradient),
          }}
        ></div>
      )}
      {effect === "grain" && <Grain />}
      {effect === "vhs" && <CRT />}
    </div>
  );
}
