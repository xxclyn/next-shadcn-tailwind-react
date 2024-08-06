"use client";

import { forwardRef, createContext, useState, useRef } from "react";
import DropdownTrigger from "./dropdown-trigger";

export const DropdownContext = createContext();

export default forwardRef(
  ({ open, trigger = "click", container, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const contentVisible = typeof open === "boolean" ? open : visible;

    let position = {
      top: 0,
      left: 0,
    };

    const triggerRef = useRef();

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const contentContainer = container || document.body;
      position = {
        top: rect.bottom + contentContainer.scrollTop + "px",
        left: rect.left + contentContainer.scrollLeft + "px",
      };
    }

    return (
      <DropdownContext.Provider
        value={{ visible: contentVisible, position, container }}
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
