import { useEffect, useRef } from "react";

const X_STEPS = [
  "0%",
  "-5%",
  "-15%",
  "7%",
  "-5%",
  "-15%",
  "15%",
  "0%",
  "3%",
  "-10%",
];
const Y_STEPS = [
  "0%",
  "-10%",
  "5%",
  "-25%",
  "25%",
  "10%",
  "0%",
  "15%",
  "35%",
  "10%",
];

export function CRT() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = grainRef.current;
    if (!el) return;

    let frame = 0;

    const interval = setInterval(() => {
      el.style.transform = `translateX(${X_STEPS[frame]})
  translateY(${Y_STEPS[frame]})`;
      frame = (frame + 1) % X_STEPS.length;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 h-full w-full overflow-hidden">
      <div
        ref={grainRef}
        className="absolute inset-[-200%] h-[400%] w-[400%] bg-[url('https://bedes.qui.gg/images/framernoise.png')] bg-size-[256px] bg-top-left opacity-3"
      ></div>
    </div>
  );
}
