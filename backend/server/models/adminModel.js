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

module.exports = {
    createEvent,
    getEvents
}