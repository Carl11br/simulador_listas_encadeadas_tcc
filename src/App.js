import "./App.css";
import React, { useState } from "react";
import CodePanel from "./components/CodePanel";
import ListPanel from "./components/ListPanel";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [currentRunningIndex, setCurrentRunningIndex] = useState(0);
  const [codeToRun, setCodeToRun] = useState([]);

  return (
    <AppContext.Provider
      value={{
        currentRunningIndex,
        setCurrentRunningIndex,
        codeToRun,
        setCodeToRun,
      }}
    >
      <div className="App">
        <CodePanel />
        <ListPanel />
      </div>
    </AppContext.Provider >
  );
}

export default App;
