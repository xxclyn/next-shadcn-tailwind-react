import { useEffect, useContext, useImperativeHandle } from "react";
import { cn } from "@/components/ui/utils/utils";

import handleLayout from "./layout";
import handleValidate from "./validate";

export function handleProps(props, FormContext, ref) {
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
    type: props.type,
    placeholder: props.placeholder,
    changeEvents: [],
    blurEvents: [],
    focusEvents: [],
    registrations: {},
  };

  // 处理默认值
  const { formModel, setFormModel } = formProps;
  if (formModel) {
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
    itemProps.value = formModel[props.id] || "";
  }

  // 处理表单校验
  const { validate, clearValidate } = handleValidate(
    props,
    formProps,
    wrapperProps,
    labelProps,
    itemProps
  );

  // 处理控件列宽
  handleLayout(props, formProps, wrapperProps, labelProps, itemProps);

  // 注册公共方法
  if (formProps.setRegistrations && props.id) {
    formProps.setRegistrations([props.id], itemProps.registrations);
  }

  // 暴露静态方法
  useImperativeHandle(ref, () => ({
    validate,
    clearValidate,
  }));

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
