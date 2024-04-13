import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
const siteUrl = process.env.REACT_APP_SITE_URL;

const ReminderList = () => {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const [newReminderDate, setNewReminderDate] = useState('');

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get(`${siteUrl}:4000/reminders/`);
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            await axios.delete(`${siteUrl}:4000/reminders/${id}`);
            fetchReminders();
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const handleAddReminder = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${siteUrl}:4000/reminders/`,
                { text: newReminder, date: newReminderDate });
            fetchReminders();
            setNewReminder('');
            setNewReminderDate('');
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [editingDate, setEditingDate] = useState(null);

    const handleEditReminder = (id, text, date) => {
        setEditingId(id);
        setEditingText(text);
        let formattedDate = new Date(date)?.toISOString()?.split('T')[0];
        setEditingDate(formattedDate);
    };

    const handleSaveReminder = async (id) => {
        try {
            await axios.put(`${siteUrl}:4000/reminders/${id}`,
                { title: editingText, date: editingDate });
            fetchReminders();
            setEditingId(null);
            setEditingText('');
            setEditingDate(null);
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
                    <input
                        className="new-reminder-input-date"
                        type="date"
                        value={newReminderDate}
                        onChange={e => setNewReminderDate(e.target.value)}
                        placeholder="New reminder"
                        required
                    />
                    <button className="add-reminder-button" type="submit">Add Reminder</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Reminder</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reminders.map((reminder) => {
                        let formattedDate = new Date(reminder.date)?.toISOString()?.split('T')[0];
                        return (
                            <tr key={reminder._id}>
                                {editingId === reminder._id ? (
                                    <>
                                        <td>
                                            <input
                                                className="new-reminder-input"
                                                type="text"
                                                value={editingText}
                                                onChange={e => setEditingText(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="new-reminder-input"
                                                type="date"
                                                value={editingDate}
                                                onChange={e => setEditingDate(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleSaveReminder(reminder._id)}>
                                                Save
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{reminder.title}</td>
                                        <td>{formattedDate}</td>
                                        <td className="reminder-actions">
                                            <button onClick={() => handleEditReminder(reminder._id, reminder.title, reminder.date)}>
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </button>
                                            <button onClick={() => handleDeleteReminder(reminder._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button className="back-to-home-button" onClick={() => navigate("/")}>
                <span className="arrow">&#8592;</span>Go to Home</button>
        </div>
    );
};

export default ReminderList;
