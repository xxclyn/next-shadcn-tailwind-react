import { useState } from "react";
import z from "zod";
import { cn } from "@/components/ui/utils/utils";
import { isEmptyValue } from "@/components/ui/utils/utils";

export default function handleValidate(
  props,
  formProps,
  wrapperProps,
  labelProps,
  itemProps
) {
  const [error, setError] = useState("");
  labelProps.error = error;
  let valueSchema;
  if (props.required) {
    valueSchema = z.any().refine((data) => !isEmptyValue(data), {
      message: "请输入" + (labelProps.label || ""),
    });
  }
  const validate = (value) => {
    if (value === undefined) {
      value = itemProps.value;
    }
    if (valueSchema) {
      const result = valueSchema.safeParse(value);
      if (!result.success) {
        setError(result.error.issues[0].message);
        return {
          status: false,
          message: result.error.issues[0].message,
        };
      } else {
        setError("");
        return {
          status: true,
        };
      }
    }
  };

  itemProps.changeEvents.push((e) => validate(e.target.value));
  itemProps.focusEvents.push(() => {
    setError("");
  });

  const clearValidate = () => {
    setError("");
  };

  if (error) {
    itemProps.className = cn(itemProps.className, "ring-1 ring-destructive");
  }

  // 注册公共方法
  itemProps.registrations.validate = validate;
  itemProps.registrations.clearValidate = clearValidate;

  return {
    validate,
    clearValidate,
  };
}
