"use client";

import { forwardRef, createContext, useState, useRef, useEffect } from "react";
import DropdownTrigger from "./dropdown-trigger";

export const DropdownContext = createContext();

export default forwardRef(
  ({ open, trigger = "click", position, container, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const contentVisible = typeof open === "boolean" ? open : visible;
    const triggerRef = useRef();

    const [triggerRect, setTriggerRect] = useState({});
    useEffect(() => {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }, [visible]);

    return (
      <DropdownContext.Provider
        value={{
          visible: contentVisible,
          position,
          triggerRect,
          container,
        }}
      >
        <DropdownTrigger
          ref={triggerRef}
          setVisible={setVisible}
          trigger={trigger}
        >
          {children}
        </DropdownTrigger>
      </DropdownContext.Provider>
    );
  }
);
