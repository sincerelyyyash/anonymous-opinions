'use client';
import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-black text-white transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--black-gradient:repeating-linear-gradient(100deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7)_7%,transparent_10%,transparent_12%,rgba(0,0,0,0.6)_16%)]
            [--aurora-dark:repeating-linear-gradient(100deg,rgba(29,78,216,0.4)_10%,rgba(102,126,234,0.3)_15%,rgba(59,130,246,0.4)_20%,rgba(139,92,246,0.3)_25%,rgba(37,99,235,0.4)_30%)]
            [background-image:var(--black-gradient),var(--aurora-dark)]
            dark:[background-image:var(--black-gradient),var(--aurora-dark)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] 
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--black-gradient),var(--aurora-dark)] 
            after:dark:[background-image:var(--black-gradient),var(--aurora-dark)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
