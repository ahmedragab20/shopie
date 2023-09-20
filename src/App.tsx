import Header from "./components/Header";

function App() {
  return (
    <div id="app">
      <Header />

      <div className=" mx-auto h-[200svh]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
