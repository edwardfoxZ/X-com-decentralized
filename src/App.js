import "./App.css";
import { Nav } from "./components/Nav";
import { NavButton } from "./components/NavButton";
import { Page } from "./components/Page";
import { useActiveNavContext } from "./context/ActiveNavContext";

function App() {
  const { activeNav, setActiveNav } = useActiveNavContext();

  return (
    <div className="App w-full h-full flex flex-row">
      <Nav />
      <NavButton activeNav={activeNav} setActiveNav={setActiveNav} />
      <header className="App-header w-full h-full">
        <Page />
      </header>
    </div>
  );
}

export default App;
