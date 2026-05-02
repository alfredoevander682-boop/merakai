import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-merkai-blue/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-merkai-blue text-white",
        secondary: "border-transparent bg-gray-100 text-gray-900",
        outline: "text-merkai-black border-gray-200",
        hot: "border-transparent bg-red-50 text-red-600",
        sponsored: "border-transparent bg-amber-50 text-amber-600",
        success: "border-transparent bg-green-50 text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
