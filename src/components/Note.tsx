import React from "react";

interface NoteProps {
  text: string;
}

const Note: React.FC<NoteProps> = ({ text }) => {
  return (
    <li className="w-full">
      <p className="text-xl py-3 border-b-2 text-left border-[#C5CAD3]">{text}</p>
    </li>
  );
};

export default Note;
