import { cn } from "@/components/ui/utils/utils";
export default function handleLayout(
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
    labelAlignCls = "justify-start text-nowrap h-9";
  } else {
    labelAlignCls = "justify-end shrink-0 h-9";
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
