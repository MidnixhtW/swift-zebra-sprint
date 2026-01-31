import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-lg">
        <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            That route doesn't exist: <span className="font-mono">{location.pathname}</span>
          </p>
          <div className="mt-6">
            <Button asChild className="rounded-2xl">
              <a href="/">Return home</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;