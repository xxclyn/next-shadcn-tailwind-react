import { forwardRef } from "react";
import MenuItem from "./menu-item";
import Menu from "./menu";
import Dropdown from "../dropdown/dropdown";
import DropdownContent from "../dropdown/dropdown-content";

export default forwardRef(({ className, title, children }, ref) => {
  return (
    <Dropdown trigger="click" position="right">
      <MenuItem className={className}>{title}</MenuItem>
      <DropdownContent>
        <Menu>{children}</Menu>
      </DropdownContent>
    </Dropdown>
  );
});
