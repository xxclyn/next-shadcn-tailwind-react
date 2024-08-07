import { forwardRef } from "react";

export default forwardRef(({ setVisible, trigger, children }, ref) => {
  let triggerEvent;

  switch (trigger) {
    case "click": {
      triggerEvent = {
        onClick: () => {
          setVisible(true);
        },
      };
      break;
    }
    case "hover": {
      triggerEvent = {
        onMouseOver: () => {
          setVisible(true);
        },
        onMouseOut: () => {
          setVisible(false);
        },
      };
      break;
    }
    case "contentmenu": {
      triggerEvent = {
        onContextMenu: (e) => {
          e.preventDefault();
          setVisible(true);
        },
      };
      break;
    }
  }

  return (
    <div ref={ref} className="inline-block" {...triggerEvent}>
      {children}
    </div>
  );
});
