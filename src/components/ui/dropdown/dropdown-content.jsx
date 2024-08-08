"use client";

import { forwardRef, useContext, useState, useEffect, useRef } from "react";
import { DropdownContext } from "./dropdown";
import Portal from "../portal/portal";

export default forwardRef(({ children }, ref) => {
  const { visible, container, position, triggerRect } =
    useContext(DropdownContext);

  const [portalPosition, setPortalPosition] = useState();
  const portalRef = useRef();
  useEffect(() => {
    if (portalRef.current) {
      const { top, left, right, bottom } = triggerRect;
      const { height, width } = portalRef.current.getBoundingClientRect();
      let newPortalPosition = {};
      switch (position) {
        case "left": {
          newPortalPosition = {
            top: `${top}px`,
            left: `${left - width}px`,
          };
          break;
        }
        case "right": {
          newPortalPosition = {
            top: `${top}px`,
            left: `${right}px`,
          };
          break;
        }
        case "top": {
          newPortalPosition = {
            top: `${top - height}px`,
            left: `${left}px`,
          };
          break;
        }
        default: {
          newPortalPosition = {
            top: `${bottom}px`,
            left: `${left}px`,
          };
        }
      }
      setPortalPosition(newPortalPosition);
    }
  }, [visible, triggerRect]);

  if (visible) {
    return (
      <Portal ref={portalRef} container={container} position={portalPosition}>
        {children}
      </Portal>
    );
  }
});
