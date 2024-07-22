"use client";

import React, { useState, createContext, useContext } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import z from "zod";

const defaultContext = {
  formModel: {},
  layout: "horizontal",
  labelAlign: "right",
  colNum: 1,
  labelWidth: "1/4",
};

export const FormContext = createContext(defaultContext);

export default function FForm(props) {
  let contextValue = { ...defaultContext, ...props };
  let [formModel, setFormModel] = useState(contextValue.formModel);
  contextValue.formModel = formModel;
  contextValue.setFormModel = setFormModel;
  return (
    <FormContext.Provider value={contextValue}>
      <form className="flex flex-wrap">{props.children}</form>
    </FormContext.Provider>
  );
}

export function FormItem({ wrapperProps, labelProps, children }) {
  const _labelProps = {
    ...labelProps,
  };
  delete _labelProps.labelAlign;
  delete _labelProps.labelWidth;
  delete _labelProps.label;
  return (
    <div {...wrapperProps}>
      {labelProps.label && (
        <Label {..._labelProps}>
          {labelProps.label}
          {labelProps.labelAlign !== "vertical" && "："}
        </Label>
      )}
      <div>
        {children}
        <div
          className={cn(
            "text-sm font-medium text-destructive mt-0.5 pl-0.5 h-5 leading-5 transition-all duration-300 opacity-0 relative bottom-2",
            labelProps.error && "opacity-1 bottom-0"
          )}
        >
          {labelProps.error}
        </div>
      </div>
    </div>
  );
}

export function handleProps(props) {
  const formProps = useContext(FormContext);
  const { formModel, setFormModel } = formProps;

  const wrapperProps = {
    className: cn("flex pb-1"),
  };
  const labelProps = {
    label: props.label,
    labelAlign: props.labelAlign || formProps.labelAlign,
    labelWidth: props.labelWidth || formProps.labelWidth,
    className: cn("flex items-center"),
  };
  const itemProps = {
    placeholder: props.placeholder,
    onChange: (e) => {
      setFormModel({ ...formModel, [props.id]: e.target.value });
    },
    onBlur: () => {
      validate();
    },
    onFocus: () => {
      setError("");
    },
  };

  // 处理模型
  if (formModel[props.id] !== undefined) {
    itemProps.value = formModel[props.id];
  } else if (itemProps.defaultValue !== undefined) {
    itemProps.value = itemProps.defaultValue;
  } else {
    itemProps.value = "";
  }

  // 处理表单校验
  const [error, setError] = useState("");
  labelProps.error = error;
  const valueSchema = z
    .string()
    .min(1, { message: "请输入" + labelProps.label });

  const validate = () => {
    const result = valueSchema.safeParse(itemProps.value);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  // 处理控件列宽
  handleWrapperWidth(props, formProps, wrapperProps, labelProps, itemProps);

  return {
    wrapperProps,
    labelProps,
    itemProps,
    formModel,
  };
}

function handleWrapperWidth(
  props,
  formProps,
  wrapperProps,
  labelProps,
  itemProps
) {
  // 每列占比
  let widthCls;
  if (props.span) {
    widthCls = props.span;
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
  let gutterCls = formProps.gutter;

  // label宽度
  let labelWidth = labelProps.labelWidth;
  let labelWidthCls;
  if (labelWidth === "large") {
    labelWidthCls = "w-60";
  } else if (labelWidth === "small") {
    labelWidthCls = "w-14";
  } else if (labelWidth === "default") {
    labelWidthCls = "w-28";
  } else {
    labelWidthCls = labelWidth;
  }

  // label对齐
  let labelAlign = labelProps.labelAlign;
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
  itemProps.className = cn(itemProps.className, ctrlAlignCls);
}
