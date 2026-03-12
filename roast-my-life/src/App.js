import React, { useState } from "react";
import "./App.css";

import JudgeLife from "./components/JudgeLife";
import ExcuseGenerator from "./components/ExcuseGenerator";
import OverthinkTranslator from "./components/OverthinkTranslator";

// Root app layout with tabs and shared judge input state.
function App() {
  const [judgeInput, setJudgeInput] = useState("");
  const [activeTab, setActiveTab] = useState("judge");

  return (
    <div className="App">

      <header className="hero">

        <h1>🔥 Roast My Life</h1>

        <p>
          A brutally honest website that judges your life decisions.
        </p>

      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "judge" ? "active" : ""}`}
          onClick={() => setActiveTab("judge")}
        >
          Do you want to be judged?
        </button>
        <button
          className={`tab-btn ${activeTab === "overthink" ? "active" : ""}`}
          onClick={() => setActiveTab("overthink")}
        >
          Overthinker Helper
        </button>
      </div>

      {activeTab === "judge" && (
        <div className="tools">

          <JudgeLife
            inputText={judgeInput}
            setInputText={setJudgeInput}
          />
          <ExcuseGenerator inputText={judgeInput} />

        </div>
      )}

      {activeTab === "overthink" && (
        <div className="tools single">
          <OverthinkTranslator />
        </div>
      )}

      <footer>
        Made with chaos and bad decisions 😌
      </footer>

    </div>
  );
}

export default App;
