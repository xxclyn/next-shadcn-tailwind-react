import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BasicLayout({ children }) {
  return (
    <div className="bg-muted">
      <header className="h-12 bg-background border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span>首页</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex">
        <aside className="bg-background"></aside>
        <div
          className="overflow-y-auto overflow-x-hidden flex-1"
          style={{ height: "calc(100vh - 3rem)" }}
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
