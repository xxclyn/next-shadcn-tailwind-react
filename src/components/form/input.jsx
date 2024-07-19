"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormContext } from "./form";
import z from "zod";

export default function FInput(props) {
  const formProps = React.useContext(FormContext);

  const wrapperProps = {
    className: cn("flex pb-1"),
  };
  const labelProps = {
    className: cn("flex items-center"),
  };
  const ctrlProps = {
    placeholder: props.placeholder,
  };

  // 处理模型
  const [formModel, setFormModel] = useState(formProps.formModel);
  if (formModel[props.id] === undefined) {
    setFormModel({
      ...formModel,
      [props.id]: props.defaultValue || "",
    });
  }
  ctrlProps.value = formModel[props.id];

  // 处理控件列宽
  handleWrapperWidth(props, formProps, wrapperProps, labelProps, ctrlProps);

  // 处理表单校验
  const [error, setError] = useState("");
  const valueSchema = z.string().min(1, { message: "请输入" + props.label });
  const validate = () => {
    const result = valueSchema.safeParse(formModel[props.id]);
    console.log(result);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  return (
    <div {...wrapperProps}>
      {props.label && <Label {...labelProps}>{props.label}</Label>}
      <div>
        <Input
          {...ctrlProps}
          onChange={(e) =>
            setFormModel({ ...formModel, [props.id]: e.target.value })
          }
          onBlur={() => {
            validate();
          }}
        ></Input>
        <div className="text-[0.8rem] font-medium text-destructive mt-0.5 pl-0.5 h-5 leading-5">
          {error}
        </div>
      </div>
    </div>
  );
}

function handleWrapperWidth(
  props,
  formProps,
  wrapperProps,
  labelProps,
  ctrlProps
) {
  // 每列占比
  let widthCls;
  if (props.span) {
    switch (props.span) {
      case 1:
        widthCls = "w-1/6";
        break;
      case 2:
        widthCls = "w-2/6";
        break;
      case 3:
        widthCls = "w-3/6";
        break;
      case 4:
        widthCls = "w-4/6";
        break;
      case 5:
        widthCls = "w-5/6";
        break;
      default:
        widthCls = "w-full";
    }
  } else {
    switch (formProps.colNum) {
      case 2:
        widthCls = "w-1/2";
        break;
      case 3:
        widthCls = "w-1/3";
        break;
      case 4:
        widthCls = "w-1/4";
        break;
      default:
        widthCls = "w-full";
        break;
    }
  }

  // gutter间距
  let gutterCls;
  if (formProps.gutter === 0) {
    gutterCls = "px-0";
  } else {
    gutterCls = "px-4";
  }

  // label宽度
  let labelWidth = props.labelWidth || formProps.labelWidth;
  let labelWidthCls;
  if (labelWidth === "large") {
    labelWidthCls = "w-60";
  } else if (labelWidth === "small") {
    labelWidthCls = "w-14";
  } else if (labelWidth === "1/3") {
    labelWidthCls = "w-1/3";
  } else if (labelWidth === "1/4") {
    labelWidthCls = "w-1/4";
  } else if (labelWidth === "1/5") {
    labelWidthCls = "w-1/5";
  } else {
    labelWidthCls = "w-28";
  }

  // label对齐
  let labelAlign = props.labelAlign || formProps.labelAlign;
  let labelAlignCls;
  let wrapAlignCls;
  let ctrlAlignCls;
  if (labelAlign === "vertical") {
    wrapAlignCls = "flex-col";
    labelAlignCls = "mb-2";
  } else if (labelAlign === "left") {
    labelWidthCls = "w-auto";
    labelAlignCls = "justify-start text-nowrap";
  } else {
    labelAlignCls = "justify-end shrink-0";
  }

  wrapperProps.className = cn(
    wrapperProps.className,
    widthCls,
    wrapAlignCls,
    gutterCls
  );
  labelProps.className = cn(labelProps.className, labelWidthCls, labelAlignCls);
  ctrlProps.className = cn(ctrlProps.className, ctrlAlignCls);
}
