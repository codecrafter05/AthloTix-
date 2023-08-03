const Ticket = require('../models/ticket');

module.exports = {
    create
  };

async function create(req, res){
    // Get the Ticket id from the request
    let id = req.params.id;
    // Get the ticket
    const ticket = await Ticket.findById(id);
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Add the comment to the ticket
    ticket.comments.push(req.body);

    // Save the ticket
    try{
        await ticket.save();
    } catch(err){
        console.error(err);
    }
    res.redirect(301, `/ticketss/${ticket._id}/`);
}
