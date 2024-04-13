const { addReminder, deleteReminder, getReminders, updateReminder } = require('../Controllers/ReminderController');
const router = require('express').Router();
const { authorization } = require('../Middlewares/AuthMiddleware')

router.get('/', getReminders);
router.post('/', authorization, addReminder);
router.put('/:id', authorization, updateReminder);
router.delete('/:id', authorization, deleteReminder);

module.exports = router;
