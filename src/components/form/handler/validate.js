import { useState } from "react";
import z from "zod";
import { cn } from "@/lib/utils";
import { isEmptyValue } from "@/lib/utils";

export default function handleValidate(
  props,
  formProps,
  wrapperProps,
  labelProps,
  itemProps,
  formModel
) {
  const [error, setError] = useState("");
  labelProps.error = error;
  let valueSchema;
  if (props.required) {
    valueSchema = z.any().refine((data) => !isEmptyValue(data), {
      message: "请输入" + (labelProps.label || ""),
    });
  }
  const validate = () => {
    const result = valueSchema.safeParse(formModel[props.id]);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  itemProps.blurEvents.push(validate);

  itemProps.focusEvents.push(() => {
    setError("");
  });

  if (error) {
    itemProps.className = cn(itemProps.className, "ring-1 ring-destructive");
  }
}
