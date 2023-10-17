import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import { useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode } = useColorMode()

  return (
      <div className={colorMode === "dark" ? "dark-mode" : ""}>
        <Header />
        <List />
      </div>
  );
}

export default App;
