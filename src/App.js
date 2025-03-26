import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./App.css";

const hashAlgorithms = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

const generateHash = (text, algorithm) => {
  switch (algorithm) {
    case "MD5":
      return CryptoJS.MD5(text).toString();
    case "SHA-1":
      return CryptoJS.SHA1(text).toString();
    case "SHA-256":
      return CryptoJS.SHA256(text).toString();
    case "SHA-512":
      return CryptoJS.SHA512(text).toString();
    default:
      return "";
  }
};

const detectHashType = (hash) => {
  if (!hash) return "Unknown";
  if (hash.length === 32) return "MD5";
  if (hash.length === 40) return "SHA-1";
  if (hash.length === 64) return "SHA-256";
  if (hash.length === 128) return "SHA-512";
  return "Unknown";
};

const App = () => {
  const [inputText, setInputText] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("MD5");
  const [hash, setHash] = useState("");
  const [detectedType, setDetectedType] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [hashToIdentify, setHashToIdentify] = useState("");
  const [identifiedType, setIdentifiedType] = useState("Unknown");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleGenerate = () => {
    const generatedHash = generateHash(inputText, selectedAlgorithm);
    setHash(generatedHash);
    setDetectedType(detectHashType(generatedHash));
  };

  const handleIdentify = () => {
    setIdentifiedType(detectHashType(hashToIdentify));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Hash Identifier</h1>
        <nav>
          <button>Home</button>
          <button>About</button>
          <button>Contact</button>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <h1 class="page-heading">Welcome to Hash Identifier</h1>

      <main className="container">
        <h2>Generate & Identify Hashes</h2>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to hash"
        />
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          {hashAlgorithms.map((algo) => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
        <button onClick={handleGenerate}>Generate Hash</button>
        {hash && <p className="hash-output">Generated Hash: {hash}</p>}
        {hash && <p>Detected Type: {detectedType}</p>}

        <h2>Identify Hash</h2>
        <input
          type="text"
          value={hashToIdentify}
          onChange={(e) => setHashToIdentify(e.target.value)}
          placeholder="Enter hash to identify"
        />
        <button onClick={handleIdentify}>Identify Hash</button>
        <p>Identified Type: {identifiedType}</p>
      </main>

      <section className="about">
        <h2>About This Project</h2>
        <p>
          This tool generates cryptographic hash values using popular algorithms
          like MD5, SHA-1, SHA-256, and SHA-512. It also detects the type of a
          given hash. Note that cryptographic hashes are one-way functions and
          cannot be decrypted.
        </p>
      </section>
    </div>
  );
};

export default App;
