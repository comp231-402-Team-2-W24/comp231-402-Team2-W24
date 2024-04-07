const { addReminder, deleteReminder, getReminders, updateReminder } = require('../Controllers/ReminderController');
const router = require('express').Router();

router.get('/', getReminders);
router.post('/', addReminder);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

module.exports = router;
