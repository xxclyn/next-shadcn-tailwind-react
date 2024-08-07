import { forwardRef } from "react";
import { cn } from "../utils/utils";

export default forwardRef(({ className, children }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
  >
    {children}
  </li>
));
