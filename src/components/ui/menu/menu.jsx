import { forwardRef } from "react";
import { cn } from "../utils/utils";

export default forwardRef(({ className, children }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-col items-center rounded-md bg-background border p-1 shadow-sm",
      className
    )}
  >
    {children}
  </ul>
));
