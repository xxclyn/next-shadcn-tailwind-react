"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { FormContext, FormItem } from "./form";
import { handleProps } from "./handler";

export default React.forwardRef((props, ref) => {
  const { wrapperProps, labelProps, itemProps } = handleProps(
    props,
    FormContext,
    ref
  );
  return (
    <FormItem wrapperProps={wrapperProps} labelProps={labelProps}>
      <Input
        placeholder={itemProps.placeholder}
        value={itemProps.value}
        onChange={itemProps.handleChange}
        onBlur={itemProps.handleBlur}
        onFocus={itemProps.handleFocus}
        className={itemProps.className}
        type={itemProps.type}
      ></Input>
    </FormItem>
  );
});
