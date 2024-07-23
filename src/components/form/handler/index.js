import { useEffect, useContext } from "react";
import { cn } from "@/lib/utils";

import handleLayout from "./layout";
import handleValidate from "./validate";

export function handleProps(props, FormContext) {
  const formProps = useContext(FormContext);
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
    className: "",
    placeholder: props.placeholder,
    changeEvents: [],
    blurEvents: [],
    focusEvents: [],
  };

  // 处理默认值
  const { formModel, setFormModel } = formProps;
  useEffect(() => {
    if (formModel[props.id] === undefined) {
      setFormModel((formModel) => ({
        ...formModel,
        [props.id]:
          itemProps.defaultValue === undefined ? "" : itemProps.defaultValue,
      }));
    }
  }, []);
  itemProps.changeEvents.push((e) => {
    setFormModel({ ...formModel, [props.id]: e.target.value });
  });

  // 处理表单校验
  handleValidate(
    props,
    formProps,
    wrapperProps,
    labelProps,
    itemProps,
    formModel
  );

  // 处理控件列宽
  handleLayout(
    props,
    formProps,
    wrapperProps,
    labelProps,
    itemProps,
    formModel
  );

  // 事件处理
  itemProps.handleChange = async (e) => {
    itemProps.changeEvents.forEach((event) => {
      event(e);
    });
    itemProps.onChange && (await itemProps.onChange(e));
  };

  itemProps.handleFocus = async (e) => {
    itemProps.focusEvents.forEach((event) => {
      event(e);
    });
    itemProps.onChange && (await itemProps.onFocus(e));
  };

  itemProps.handleBlur = async (e) => {
    itemProps.blurEvents.forEach((event) => {
      event(e);
    });
    itemProps.onChange && (await itemProps.onBlur(e));
  };

  return {
    wrapperProps,
    labelProps,
    itemProps,
    formModel,
  };
}
