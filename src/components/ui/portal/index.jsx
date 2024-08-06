"use client";

import { forwardRef } from "react";
import { createPortal } from "react-dom";

export default forwardRef(({ container, position, children }, ref) => {
  return createPortal(
    <div style={{ position: "absolute", ...position }} ref={ref}>
      <div>{children}</div>
    </div>,
    container || document.body
  );
});
