//file : routes/tickets.js
var express = require('express');
var router = express.Router();
const ticketsController = require('../controllers/tickets');

// GET /tickets
router.get('/', ticketsController.ticketsIndex);
// GET /tickets/new (showing new ticket page)
router.get('/new', ticketsController.showNewTicketPage);
// POST /tickets (actually creating new ticket)
router.post('/', ticketsController.createTicket);
// GET /tickets/:id
router.get('/:id', ticketsController.showTicket);
// POST /tickets/:id/update-category (updating ticket category)
router.post('/:id/update-category', ticketsController.updateTicketCategory);
// POST /tickets/:id/update-Status (updating ticket status)
 router.post('/:id/update-Status', ticketsController.updateTicketStatus);
module.exports = router;
