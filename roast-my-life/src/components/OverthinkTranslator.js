import React, { useState } from "react";

// Overthinking translator that speaks the result out loud.
function OverthinkTranslator() {

  const [result, setResult] = useState("");
  const [inputText, setInputText] = useState("");

  const translations = [
    "They hate me.",
    "I definitely did something wrong.",
    "This friendship is over.",
    "They are secretly angry.",
    "Why did I even send that message?"
  ];

  // Speak a line using browser speech synthesis.
  const speak = (text, options = {}) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      speechSynthesis.speak(utterance);
    });
  };

  // Choose a translation and read it aloud.
  const translate = async () => {
    const random = Math.floor(Math.random() * translations.length);
    const next = translations[random];
    setResult(next);

    await speak(next, { rate: 1, pitch: 1 });
  };

  return (
    <div className="card">

      <h2>Overthinking Translator</h2>

      <input
        type="text"
        placeholder="Type a message (like 'ok')"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={translate}>
        Translate
      </button>

      <p className="result">{result}</p>

    </div>
  );
}

export default OverthinkTranslator;
