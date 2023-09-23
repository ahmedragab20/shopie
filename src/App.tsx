import Header from "./components/Header";
function App() {
  return (
    <div id="shopie_app">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="flex justify-center items-center flex-col mt-20 py-20 border-t">
        <h5 className="text-xl sm:text-3xl text-heading mb-2">
          Shopie App <span>&trade;</span>
        </h5>
        <h6>
          Made with 🤦🏻‍♂️ by{" "}
          <a
            href="https://github.com/ahmedragab20"
            target="_blank"
            rel="noreferrer"
            className=" text-rose-400 hover:underline hover:text-rose-500"
          >
            Ahmed Ragab
          </a>
        </h6>
      </footer>
    </div>
  );
}

export default App;
