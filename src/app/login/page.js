import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "@/components/form/input";
import Form from "@/components/form/form";

export default function Login() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-400 to-lime-400">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>请输入账号密码</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Form labelAlign="vertical">
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
          <Button className="w-full mt-4">登 录</Button>
        </CardContent>
      </Card>
    </main>
  );
}
