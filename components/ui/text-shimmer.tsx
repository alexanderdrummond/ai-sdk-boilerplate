import type * as React from "react";

import { cn } from "@/lib/utils";

type TextShimmerProps = {
  as?: React.ElementType;
  duration?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function TextShimmer({
  as: Component = "span",
  className,
  duration = 2.5,
  children,
  style,
  ...props
}: TextShimmerProps) {
  return (
    <Component
      className={cn(
        "bg-[length:200%_auto] bg-clip-text font-medium text-transparent",
        "animate-[shimmer_2.5s_infinite_linear]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--muted-foreground) 30%, var(--foreground) 50%, var(--muted-foreground) 70%)",
        animationDuration: `${duration}s`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
