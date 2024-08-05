export default function BasicLayout({ children }) {
  return (
    <div className="bg-muted">
      <header className="h-12 bg-background border-b"></header>
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
