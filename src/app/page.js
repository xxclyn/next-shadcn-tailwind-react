import Input from "@/components/form/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-blue-500 to-indigo-500">
      <Input required placeholder="测试输入框"></Input>
    </main>
  );
}
