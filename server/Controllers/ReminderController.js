const Reminder = require('../Models/ReminderModel');

// Get all reminders
const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a reminder
const addReminder = async (req, res) => {
    const reminder = new Reminder({
        title: req.body.text,
        date: req.body.date,
        userId: req.userId,
    });
    
    try {
        const newReminder = await reminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Update a reminder
const updateReminder = async (req, res) => {
    try {
        const updatedReminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.json(updatedReminder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete a reminder
const deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.json({ message: "Reminder deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReminders,
    addReminder,
    deleteReminder,
    updateReminder
};
