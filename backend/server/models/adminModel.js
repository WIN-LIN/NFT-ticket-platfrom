const { pool } = require('./mysqlcon');
const fs = require('fs');
const path = require('path');

const createEvent = async ( newEvent ) => {
    const conn = await pool.getConnection();
    try{
        await conn.query('START TRANSACTION');
        const [result] = await conn.query('INSERT INTO event SET ?', newEvent);
        await conn.query('COMMIT');
        return result.insertId;

    } catch (error){
        console.log(error)
        await conn.query('ROLLBACK');
        return -1;
    } finally {
        await conn.release();
    }
};

const mintTicket = async ( ticket ) => {
    const conn = await pool.getConnection();
    try{
        console.log("DB",ticket);
        await conn.query('START TRANSACTION');
        const [result] = await conn.query('INSERT INTO ticket SET ?', ticket);
        await conn.query('COMMIT');
        return result.insertId;

    } catch (error){
        console.log(error)
        await conn.query('ROLLBACK');
        return -1;
    } finally {
        await conn.release();
    }
};

const sellTicket = async ( ticket ) => {
    const conn = await pool.getConnection();
    try{
        await conn.query('START TRANSACTION');
        const [result] = await conn.query('UPDATE ticket SET on_sale = ?, selling_price=? WHERE token_id = ?', [ticket.on_sale, ticket.selling_price, ticket.token_id]);
        await conn.query('COMMIT');
        return result.insertId;

    } catch (error){
        console.log(error)
        await conn.query('ROLLBACK');
        return -1;
    } finally {
        await conn.release();
    }
};

const buyTicket = async (eventId, ticketId) => {
    const conn = await pool.getConnection();
    try{
        await conn.query('START TRANSACTION');
        const [result] = await conn.query('UPDATE ticket SET on_sale = 0 WHERE token_id = ? AND event_id = ?', [ticketId, eventId]);
        await conn.query('COMMIT');
        return result.insertId;

    } catch (error){
        console.log(error)
        await conn.query('ROLLBACK');
        return -1;
    } finally {
        await conn.release();
    }
};
const getEvents = async (pageSize, paging = 0, requirement = {}) => {

    const condition = [];
    if (requirement.category === 'all') {
        console.log('all');
        condition.sql = '';
        condition.binding = [];
    } else if (requirement.account != null) {
        condition.sql = 'WHERE host = ?';
        condition.binding = [requirement.account];
    } else if (requirement.keyword != null) {
        condition.sql = 'WHERE name LIKE ?';
        condition.binding = [`%${requirement.keyword}%`];
    } else if (requirement.id != null) {
        condition.sql = 'WHERE ID = ?';
        condition.binding = [requirement.id];
    }

    const limit = {
        sql: 'LIMIT ?, ?',
        binding: [pageSize * paging, pageSize]
    }

    const eventQuery = 'SELECT * FROM event ' + condition.sql + ' ORDER BY id ' + limit.sql;
    const eventBindings = condition.binding ? condition.binding.concat(limit.binding) : limit.binding;
    const [events] = await pool.query(eventQuery, eventBindings);
    return {
        'events': events,
        'eventCount': events[0].count
    }
};

const getTickets = async (eventId) => {
    const [ result ] = await pool.query('SELECT * FROM ticket WHERE event_id = ? AND on_sale = 1 ', [eventId]);
    console.log(result);
    return result;
}

module.exports = {
    createEvent,
    getEvents,
    mintTicket,
    sellTicket,
    getTickets,
    buyTicket
}