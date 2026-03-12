import React, { useEffect, useRef, useState } from "react";
import faaaSound from "../assets/faaa.mp3";

// Judge card with input-aware roasts, meme, and audio sequence.
function JudgeLife({ inputText, setInputText }) {

  const [result, setResult] = useState("");
  const [meme, setMeme] = useState("");
  const soundRef = useRef(null);

  const responsePools = [
    {
      keywords: ["ex", "breakup", "relationship", "crush", "texted", "ghost"],
      responses: [
        "You texted them again? Bold choice. Terrible one.",
        "That relationship was a tutorial level you never cleared.",
        "Stop overanalyzing and let the ghost stay a ghost."
      ]
    },
    {
      keywords: ["sleep", "late", "tired", "insomnia", "alarm", "nap"],
      responses: [
        "You are one snooze button away from chaos.",
        "Sleep debt is still debt. Pay it.",
        "At this point your pillow knows more than your planner."
      ]
    },
    {
      keywords: ["money", "rent", "broke", "shopping", "impulse", "credit", "debt"],
      responses: [
        "Your wallet just filed a restraining order.",
        "Rent is due and you bought a vibe instead.",
        "Impulse purchases are not a personality."
      ]
    },
    {
      keywords: ["gym", "diet", "pizza", "burger", "workout", "calories", "healthy"],
      responses: [
        "You can't out-train a double-cheese decision.",
        "Your gym membership is a subscription to guilt.",
        "Calories count even when you look away."
      ]
    },
    {
      keywords: ["exam", "test", "study", "assignment", "deadline", "class", "homework"],
      responses: [
        "If procrastination were a major, you'd have honors.",
        "Deadlines are not suggestions.",
        "You studied the night before and expected a miracle."
      ]
    },
    {
      keywords: ["work", "boss", "job", "meeting", "email", "office", "client"],
      responses: [
        "That email was a cry for help in subject line form.",
        "You brought chaos to a calendar invite.",
        "Your job is a paycheck; your decisions are the risk."
      ]
    }
  ];

  const fallbackResponses = [
    "Congratulations. You played yourself.",
    "That was a terrible life decision.",
    "Your brain.exe stopped working.",
    "Achievement unlocked: Overthinking Level 100.",
    "Bro... this is embarrassing."
  ];

  const memes = [
    "https://i.imgflip.com/1bij.jpg",
    "https://i.imgflip.com/26am.jpg",
    "https://i.imgflip.com/30b1gx.jpg",
    "https://i.imgflip.com/4t0m5.jpg"
  ];

  // Load the interlude audio once.
  useEffect(() => {
    soundRef.current = new Audio(faaaSound);
  }, []);

  // Play the interlude audio and resolve when it ends.
  const playFaaa = () => {
    return new Promise((resolve) => {
      const audio = soundRef.current;
      if (!audio) {
        resolve();
        return;
      }

      audio.pause();
      audio.currentTime = 0;
      audio.onended = resolve;
      audio.onerror = resolve;
      audio.play().catch(() => resolve());
    });
  };

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

  // Escape regex characters in keywords so matching is safe.
  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Pick a roast based on whole-word keyword matches.
  const pickRoast = (text) => {
    const normalized = text.toLowerCase();
    const matches = responsePools.find((pool) =>
      pool.keywords.some((word) => {
        const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
        return pattern.test(normalized);
      })
    );

    const pool = matches ? matches.responses : fallbackResponses;
    const random = Math.floor(Math.random() * pool.length);
    return pool[random];
  };

  // Run the full judge flow: speak input, play audio, speak roast, set meme.
  const judge = async () => {
    const roast = pickRoast(inputText);

    setResult(roast);

    /* Voice sequence: input -> audio -> roast */
    const trimmedInput = inputText.trim();
    if (trimmedInput.length > 0) {
      await speak(trimmedInput, { rate: 1, pitch: 1 });
    }

    await playFaaa();
    await speak(roast, { rate: 1, pitch: 1 });

    /* Random Meme */
    let memeRandom = Math.floor(Math.random() * memes.length);
    setMeme(memes[memeRandom]);

  };

  return (

    <div className="card">

      <h2> Judge My Life</h2>

      <input
        placeholder="Type your situation..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={judge}>
        Judge Me
      </button>

      <p className="result">{result}</p>

      {meme && (
        <img
          src={meme}
          alt="meme"
          className="meme"
        />
      )}

    </div>

  );
}

export default JudgeLife;
