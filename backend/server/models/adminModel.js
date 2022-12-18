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

module.exports = {
    createEvent,
}