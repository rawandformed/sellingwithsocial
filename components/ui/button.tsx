import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent font-sans font-semibold tracking-[.005em] no-underline cursor-pointer transition-[background-color,transform] duration-150 ease-brand active:translate-y-px",
  {
    variants: {
      variant: {
        /* Yellow. The main button. */
        accent: "bg-yellow text-ink hover:bg-yellow-hover",
        /* Ink. Nav and secondary. */
        ink: "bg-ink text-white hover:bg-[#262b31]",
        /* Underlined text link. */
        link: "h-auto p-0 text-ink underline underline-offset-4 decoration-line-2",
      },
      size: {
        default: "h-12 px-[22px] text-[16px] leading-5",
        sm: "h-10 px-[18px] text-[15px] leading-5",
      },
    },
    compoundVariants: [{ variant: "link", class: "h-auto px-0" }],
    defaultVariants: { variant: "accent", size: "default" },
  },
);

type ButtonLinkProps = React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

/** A link styled as a button. Every button on the site navigates, so it renders an <a>. */
function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { ButtonLink, buttonVariants };
