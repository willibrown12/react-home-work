import { useState } from "react";

export function WhatIsYourName() {
  const [userName, setUserName] = useState("Gal Amouyal");
  const [inputValue, setInputValue] = useState("aaa");

  return (
    <div>
      <input
        value={inputValue}
        type="text"
        id="input"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setUserName(inputValue);
        }}
      >
        Set User Name
      </button>
      <h1 style={{ color: inputValue }}> {userName} </h1>
    </div>
  );
}
