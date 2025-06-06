import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

interface AccordionSkeletonProps {
  itemCount?: number;
  className?: React.CSSProperties;
  isExpanded?: boolean;
}

export const AccordionSkeleton = ({
  itemCount = 3,
  className,
  isExpanded = false,
}: AccordionSkeletonProps) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-md border border-border"
        >
          {/* Mimics AccordionTrigger */}
          <div className="flex h-12 w-full items-center justify-between p-4">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-4" />
          </div>

          {/* Mimics AccordionContent (only if isExpanded is true) */}
          {isExpanded && (
            <div className="p-4 pt-0">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
