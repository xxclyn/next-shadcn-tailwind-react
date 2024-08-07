"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/button";
import Card from "@/components/ui/card/card";
import Input from "@/components/ui/form/input";
import Form from "@/components/ui/form/form";

export default function Login() {
  const router = useRouter();
  const loginFormRef = useRef(null);
  const handleLogin = () => {
    const validate = loginFormRef.current.validate();
    if (!validate.status) {
      return;
    }
    router.push("/");
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-400 to-lime-400">
      <Card title="登录" description="请输入账号密码">
        <Form ref={loginFormRef} labelAlign="vertical">
          <Input
            label="用户名"
            id="username"
            placeholder="请输入用户名"
            required
          />
          <Input
            label="密码"
            id="password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </Form>
        <Button onClick={handleLogin} className="w-full mt-4">
          登 录
        </Button>
      </Card>
    </div>
  );
}
