import { Button } from "./ui/button";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}
export function SiteHeader({ isPanelOpen, onTogglePanel }: Props) {
  return (
    <header className="border-b flex items-center justify-between px-4 sticky top-0 z-50 bg-background backdrop-blur-sm h-(--header-height)">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-medium tracking-wide">Background Lab</h1>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon" onClick={onTogglePanel}>
                {isPanelOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
              </Button>
            }
          />
          <TooltipContent>
            <p>{isPanelOpen ? "Close Panel" : "Open Panel"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
