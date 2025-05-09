import React, { useState } from "react";
import AddIcon from "../assets/add_icon.png";

interface NoteFormProps {
  onAddNote: (text: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = noteText.trim();
    if (!text) return;
    onAddNote(text);
    setNoteText("");
  };

  return (
    <form className="px-6 flex items-center space-x-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={noteText}
        required
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="New Note..."
        className="flex-1 w-full h-12 px-4 py-4 rounded-lg border border-gray-300 shadow text-black text-lg focus:outline-none placeholder:text-[#303C4DA3]"
      />
      <button
        type="submit"
        className="h-12 w-24 bg-[#922E0E] text-white rounded-lg shadow flex items-center justify-center gap-1.5 font-bold cursor-pointer"
      >
        <img src={AddIcon} alt="logo" className="size-6" />
        Add
      </button>
    </form>
  );
};

export default NoteForm;
