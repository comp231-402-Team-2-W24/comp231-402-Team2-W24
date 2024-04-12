const Note = require('../Models/NoteModel');

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a note
const addNote = async (req, res) => {
    const note = new Note({
        userId: '65fe78d5f02124783f6a84f0',
        content: req.body.text
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { content: req.body.text, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote
};