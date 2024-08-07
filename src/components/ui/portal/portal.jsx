"use client";

import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/utils";

export default forwardRef(({ container, position, children }, ref) => {
  return createPortal(
    <div
      className={cn({ hidden: !position })}
      style={{ position: "absolute", ...position }}
      ref={ref}
    >
      {children}
    </div>,
    container || document.body
  );
});
