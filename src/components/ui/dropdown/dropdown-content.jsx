"use client";

import { forwardRef, useContext } from "react";
import { DropdownContext } from "./dropdown";
import Portal from "../portal";

export default forwardRef(({ children }, ref) => {
  const { visible, container, position } = useContext(DropdownContext);
  if (visible) {
    return (
      <Portal ref={ref} container={container} position={position}>
        {children}
      </Portal>
    );
  }
});
