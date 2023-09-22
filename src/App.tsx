import Header from "./components/Header";
import { useRef } from "react";

function App() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = headerRef.current?.getBoundingClientRect().height;

  return (
    <div
      id="shopie_app"
      style={{
        paddingTop: headerHeight,
      }}
    >
      <Header ref={headerRef} />

      <div className="mx-auto h-[200svh]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
