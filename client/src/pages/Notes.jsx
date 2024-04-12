import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const Notes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get("http://localhost:4000/notes/");
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/notes/${id}`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleAddNote = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:4000/notes/", { text: newNote });
            fetchNotes();
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleEditNote = (id, text) => {
        setEditingId(id);
        setEditingText(text);
    };

    const handleSaveNote = async () => {
        try {
            await axios.put(`http://localhost:4000/notes/${editingId}`, { text: editingText });
            fetchNotes();
            setEditingId(null);
            setEditingText('');
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <div>
            <h2>Academic Record Notes</h2>
            <form onSubmit={handleAddNote}>
                <div className="new-note-form">
                    <input
                        className="new-note-input"
                        type="text"
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        placeholder="New note"
                        required
                    />
                    <button className="add-note-button" type="submit">Add Note</button>
                </div>
            </form>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        {editingId === note._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={e => setEditingText(e.target.value)}
                                />
                                <button onClick={handleSaveNote}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <div className="note-item">
                                {note.content}
                                <div className="note-actions">
                                    <button onClick={() => handleEditNote(note._id, note.text)}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button onClick={() => handleDeleteNote(note._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

        <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
};

export default Notes;
