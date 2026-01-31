import { format } from "date-fns";
import { Cross, ExternalLink, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AppHeader() {
  const today = new Date();
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Cross className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              {format(today, "MMM d, yyyy")}
            </p>
            <h1 className="text-lg font-semibold tracking-tight">Kyrie Companion</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 rounded-2xl border-border/60 p-0"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Badge className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline-flex">
            OCA sources
          </Badge>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-2xl border-border/60"
          >
            <a href="https://www.oca.org" target="_blank" rel="noreferrer">
              OCA <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-3xl border-border/60 bg-card">
        <AspectRatio ratio={16 / 6}>
          <img
            alt="Church interior"
            src="https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=1800&q=80"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              Built for young adults
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed">
              Prayers, fasting guidance, daily readings, and a Jesus Prayer rope — all with
              direct references to the Orthodox Church in America.
            </p>
          </div>
        </AspectRatio>
      </Card>
    </div>
  );
}