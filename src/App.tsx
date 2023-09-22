import Header from "./components/Header";
import { useRef } from "react";

function App() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, [headerRef]);

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
