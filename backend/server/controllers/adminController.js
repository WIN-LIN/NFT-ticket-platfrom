require('dotenv').config();
const Admin = require('../models/adminModel');
const createEvent = async (req, res) => {

    const event = {
        name: req.body.eventName,
        ticket_address: req.body.ticketAddress,
        market_address: req.body.marketAddress,
        cover_img: `${req.body.eventName}/${req.file.filename}`,
        place: req.body.location,
        information: req.body.description,
        host: req.body.owner,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        refund_time: req.body.refundTime,
        ticket_price: req.body.ticketPrice,
        ticket_total: req.body.ticketSupply,
        event_symbol: req.body.eventSymbol,
        royalty_rate: req.body.royaltyRate,
        refund_rate: req.body.refundRate

    }
    const eventId = await Admin.createEvent(event);
    if (eventId == -1) {
        res.status(500);
    } else {
        res.status(200).send("Create successful");
    }
};

module.exports = {
    createEvent,
}