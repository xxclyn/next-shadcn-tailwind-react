import Input from "@/components/form/input";

export default function Home() {
  const props = {
    label: "输入框",
    id: "formItem",
    placeholder: "这是一个输入框",
    defaultValue: "默认值",
    disabled: true,
    hidden: true,
    destroy: true,
    prefixTip: "前置提示",
    suffixTip: "后置提示",
    unitName: "万元",
    suffixBtn: "核查",
    suffixIcon: "",
    allowClear: true,
    width: "full",
    labelWidth: "36",
    wrapperWitdh: "9/12",
    required: true,
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-blue-500 to-indigo-500">
      <Input props={props} placeholder="测试输入框"></Input>
    </main>
  );
}
