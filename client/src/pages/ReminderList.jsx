import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const ReminderList = () => {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get("http://localhost:4000/reminders/");
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/reminders/${id}`);
            fetchReminders();
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const handleAddReminder = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:4000/reminders/", { text: newReminder });
            fetchReminders();
            setNewReminder('');
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleEditReminder = (id, text) => {
        setEditingId(id);
        setEditingText(text);
    };

    const handleSaveReminder = async (id) => {
        try {
            await axios.put(`http://localhost:4000/reminders/${id}`, { title: editingText });
            fetchReminders();
            setEditingId(null);
            setEditingText('');
        } catch (error) {
            console.error('Error saving reminder:', error);
        }
    };

    return (
        <div>
            <h2>Reminder List</h2>
            <form onSubmit={handleAddReminder}>
                <div className="new-reminder-form">
                    <input
                        className="new-reminder-input"
                        type="text"
                        value={newReminder}
                        onChange={e => setNewReminder(e.target.value)}
                        placeholder="New reminder"
                        required
                    />
                    <button className="add-reminder-button" type="submit">Add Reminder</button>
                </div>
            </form>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        {editingId === reminder._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={e => setEditingText(e.target.value)}
                                />
                                <button onClick={() => handleSaveReminder(reminder._id)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <div className="reminder-item">
                                {reminder.title}
                                <div className="reminder-actions">
                                    <button onClick={() => handleEditReminder(reminder._id, reminder.title)}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button onClick={() => handleDeleteReminder(reminder._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReminderList;
