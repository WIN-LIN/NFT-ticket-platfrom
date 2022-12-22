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

const mintTickets = async (req, res) => {

    let failIdx = 0;
    for (let i = req.body.fromId; i < req.body.toId; i++){

        const ticket = {
            event_id: req.body.eventId,
            use: 0,
            last_use_time: null,
            on_sale: false,
            selling_price: null,
            token_id: i
        }

        const ticketId = await Admin.mintTicket(ticket);
        if (ticketId == -1) {
            failIdx = i;
            break;
        }
    }
    if (failIdx == 0) {
        res.status(200).send("Store successful");
    } else {
        res.status(500).send(`Store failed${failIdx}`);
    }

};
const sellTickets = async (req, res) => {

    let failIdx = 0;
    for (let i = req.body.fromId; i < req.body.toId; i++){

        const ticket = {
            last_use_time: null,
            on_sale: true,
            selling_price: req.body.sellingPrice,
            token_id: i
        }

        const ticketId = await Admin.sellTicket(ticket);

        if (ticketId == -1) {
            failIdx = i;
            break;
        }
    }
    if (failIdx == 0) {
        res.status(200).send("Set successful");
    } else {
        res.status(500).send(`Set failed${failIdx}`);
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
            case 'ID': {
                const id = req.query.id;
                if (id) {
                    return await Admin.getEvents(pageSize, paging, {id});
                }
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
    getEvents,
    mintTickets,
    sellTickets
}