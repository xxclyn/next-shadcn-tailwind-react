"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { FormItem, handleProps } from "./form";

export default function FInput(props) {
  const { wrapperProps, labelProps, itemProps } = handleProps(props);
  return (
    <FormItem wrapperProps={wrapperProps} labelProps={labelProps}>
      <Input {...itemProps}></Input>
    </FormItem>
  );
}
