import React from "react";
import Note from "./Note";
import { type ITask } from "../lib/type";

interface NotesListProps {
    notes: ITask[];
    isLoading: boolean;
    error: Error;
}

const NotesList: React.FC<NotesListProps> = ({ notes, isLoading, error }) => {
    return (
        <div className="flex flex-col px-6 pt-8 pb-6 overflow-hidden">
            <h2 className="text-xl font-semibold text-left border-b-2 border-[#C5CAD3] pb-1">Notes</h2>

            <div className="flex-1 flex flex-col">
                {error && <p className="text-red-500 py-4 mt-2">Error loading notes. Please try again.</p>}

                {!error && isLoading && <p className="text-gray-500 py-4 mt-2">Loading notes...</p>}

                {!error && !isLoading && notes.length === 0 && <p className="text-gray-500 py-4 mt-2">No notes yet. Add one!</p>}

                {!error && notes.length > 0 && (
                    <ol className="list-none flex flex-col w-full max-h-[270px] overflow-y-auto scroll-gutter">
                        {notes.map((note) => (
                            <Note key={note?.id} text={note?.text} />
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
};

export default NotesList;
