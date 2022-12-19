require('dotenv').config();
const Admin = require('../models/adminModel');
const pageSize = 9;
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
const getEvents = async (req, res) => {
    const category = req.params.category;
    const paging = parseInt(req.query.paging) || 0;

    async function findEvent(category) {
        switch (category) {
            case 'all':
                return await Admin.getEvents(pageSize, paging, {category});
            case 'admin':
                const account = req.query.account;
                return await Admin.getEvents(pageSize, paging, {account});
            case 'search': {
                const keyword = req.query.keyword;
                if (keyword) {
                    return await Admin.getEvents(pageSize, paging, {keyword});
                }
                break;
            }
        }
        return Promise.resolve([]);
    }

    const { events, eventCount } = await findEvent(category);
    if (!events) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (events.length == 0) {
        res.status(200).json({data: []});
        return;
    }

    const result = (eventCount > (paging + 1) * pageSize) ? {
        data: events,
        paging: paging + 1
    } : {
        data: events
    }

    res.status(200).json({data: events});

};

module.exports = {
    createEvent,
    getEvents

}