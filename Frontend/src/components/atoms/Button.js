import React from "react";

export function Button({ text, onClick }) {
  return (
    <button
      className="bg-orange-300 border-solid border-2 border-s-slate-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
