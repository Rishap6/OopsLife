import React, { useState } from "react";

// Excuse card that tailors excuses to the judge input.
function ExcuseGenerator({ inputText }) {

  const [excuse, setExcuse] = useState("");

  const responsePools = [
    {
      keywords: ["ex", "breakup", "relationship", "crush", "texted", "ghost"],
      excuses: [
        "I was busy emotionally recovering from my own bad texting decisions.",
        "I had to delete a paragraph I almost sent to my ex.",
        "I was ghosted by my own motivation."
      ]
    },
    {
      keywords: ["sleep", "late", "tired", "insomnia", "alarm", "nap"],
      excuses: [
        "My alarm and I are no longer on speaking terms.",
        "I was in a deep negotiation with my pillow.",
        "Sleep won. I lost. Again."
      ]
    },
    {
      keywords: ["money", "rent", "broke", "shopping", "impulse", "credit", "debt"],
      excuses: [
        "My bank app sent me a warning and I went offline.",
        "I had to return a cart full of bad decisions.",
        "My budget entered witness protection."
      ]
    },
    {
      keywords: ["gym", "diet", "pizza", "burger", "workout", "calories", "healthy"],
      excuses: [
        "I was still recovering from leg day that never happened.",
        "My meal prep was replaced by emotional carbs.",
        "The gym called, I pretended I was asleep."
      ]
    },
    {
      keywords: ["exam", "test", "study", "assignment", "deadline", "class", "homework"],
      excuses: [
        "My notes filed a missing-person report.",
        "I tried to study but the syllabus attacked first.",
        "My laptop was buffering my brain."
      ]
    },
    {
      keywords: ["work", "boss", "job", "meeting", "email", "office", "client"],
      excuses: [
        "My calendar double-booked me with a panic attack.",
        "I was in a meeting with my inner procrastinator.",
        "My inbox staged a rebellion."
      ]
    }
  ];

  const fallbackExcuses = [
    "My laptop emotionally collapsed.",
    "My internet had trust issues.",
    "My dog submitted the wrong assignment.",
    "I was debugging my life.",
    "My brain stopped responding."
  ];

  // Escape regex characters in keywords so matching is safe.
  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Pick an excuse based on whole-word keyword matches.
  const pickExcuse = (text) => {
    const normalized = text.toLowerCase();
    const matches = responsePools.find((pool) =>
      pool.keywords.some((word) => {
        const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
        return pattern.test(normalized);
      })
    );

    const pool = matches ? matches.excuses : fallbackExcuses;
    const random = Math.floor(Math.random() * pool.length);
    return pool[random];
  };

  // Generate and speak a tailored excuse.
  const generateExcuse = () => {
    const nextExcuse = pickExcuse(inputText);
    setExcuse(nextExcuse);

    /* Voice Excuse */
    let speech = new SpeechSynthesisUtterance(nextExcuse);
    speechSynthesis.speak(speech);
  };

  return (
    <div className="card">

      <h2>Excuse Generator</h2>

      <button onClick={generateExcuse}>
        Generate Excuse
      </button>

      <p className="result">{excuse}</p>

    </div>
  );
}

export default ExcuseGenerator;
