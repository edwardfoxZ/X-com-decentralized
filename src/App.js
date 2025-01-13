import "./App.css";
import { Nav } from "./components/Nav";
import { useActiveNavContext } from "./context/ActiveNavContext";

function App() {
  const { activeNav, setActiveNav } = useActiveNavContext();

  return (
    <div className="App w-full h-full flex flex-row">
      <Nav />
      <div className="absolute top-[45%] left-5 text-black text-3xl">
        {activeNav ? (
          <button
            onClick={() => setActiveNav(false)}
            className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white transition-all duration-300"
          >
            {">"}
          </button>
        ) : (
          <button
            onClick={() => setActiveNav(true)}
            className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white transition-all duration-300"
          >
            {"<"}
          </button>
        )}
      </div>
      <header className="App-header w-full h-full"></header>
    </div>
  );
}

export default App;
