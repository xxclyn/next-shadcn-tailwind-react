"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { FormContext, FormItem } from "./form";
import { handleProps } from "./handler";

export default function FInput(props) {
  const { wrapperProps, labelProps, itemProps, formModel } = handleProps(
    props,
    FormContext
  );
  return (
    <FormItem wrapperProps={wrapperProps} labelProps={labelProps}>
      <Input
        placeholder={itemProps.placeholder}
        value={formModel[props.id] || ""}
        onChange={itemProps.handleChange}
        onBlur={itemProps.handleBlur}
        onFocus={itemProps.handleFocus}
        className={itemProps.className}
        type={itemProps.type}
      ></Input>
    </FormItem>
  );
}
