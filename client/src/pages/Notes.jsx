import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const navigate = useNavigate();
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleSaveNote = () => {
        if (note.trim() !== "") {
            setNotes([...notes, note]);
            setNote("");
        }
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    return (
        <div className="notes_page">
            <h2>Notes</h2>
            <textarea
                value={note}
                onChange={handleNoteChange}
                placeholder="Take a note..."
            ></textarea>
            <button onClick={handleSaveNote}>Save Note</button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note}
                        <button onClick={() => handleDeleteNote(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
};

export default Notes;
