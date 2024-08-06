"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { FormContext, FormItem } from "./form";
import { handleProps } from "./handler";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export default forwardRef((props, ref) => {
  const { wrapperProps, labelProps, itemProps } = handleProps(
    props,
    FormContext,
    ref
  );
  return (
    <FormItem wrapperProps={wrapperProps} labelProps={labelProps}>
      <Input
        ref={ref}
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
