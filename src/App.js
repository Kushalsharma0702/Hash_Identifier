import React, { useState } from "react";
import CryptoJS from "crypto-js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./App.css";

const hashAlgorithms = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-512"
];

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
  if (hash.length === 32) return "MD5";
  if (hash.length === 40) return "SHA-1";
  if (hash.length === 64) return "SHA-256";
  if (hash.length === 128) return "SHA-512";
  return "Unknown";
};

const decryptHash = (hash) => {
  return "Decryption not possible for one-way hashes";
};

const App = () => {
  const [inputText, setInputText] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("MD5");
  const [hash, setHash] = useState("");
  const [detectedType, setDetectedType] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleGenerate = () => {
    const generatedHash = generateHash(inputText, selectedAlgorithm);
    setHash(generatedHash);
    setDetectedType(detectHashType(generatedHash));
  };

  const handleDecrypt = () => {
    setDecryptedText(decryptHash(hash));
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "#0d1117",
          },
          particles: {
            number: {
              value: 100,
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 1,
            },
          },
        }}
      />
      <div className="container">
        <h1>Hash Identifier & Converter</h1>
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
        <button onClick={handleDecrypt}>Decrypt Hash</button>
        {decryptedText && <p className="decrypted-output">{decryptedText}</p>}
      </div>
    </div>
  );
};

export default App;
