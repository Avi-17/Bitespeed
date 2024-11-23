const db = require('../config/db');

const getRecordsByEmailorPhone = async(email, phoneNumber) => {
    const [records] = await db.execute(
        `select * from Contact where email = '${email}' or phoneNumber = '${phoneNumber}'`
    );
    return records;
}

const getRecordsByEmailandPhone = async(email, phoneNumber) => {
    const [records] = await db.execute(
        `select * from Contact where email = '${email}' and phoneNumber = '${phoneNumber}'`
    );

    return records;
}


const createRecord = async(email, phoneNumber, linkedId = null, linkPrecedence= 'primary') => {
    const [newRecord] = await db.execute(
        `insert into Contact (email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt) values(?, ?, ?, ?, now(), now())`, [email, phoneNumber, linkedId, linkPrecedence]
    )
    return newRecord.insertId;
}

const updateRecordUsingId = async (id, updates) => {
    const keysToUpdate = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    await db.execute(`update Contact set ${keysToUpdate} where id = ?`, values);
};

const updateRecordUsingLinkedId = async(linkedId, updates) => {
    const keysToUpdate = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), linkedId];
    await db.execute(`update Contact set ${keysToUpdate} where linkedId = ?`, values);
}

const getContactsByLinkedId = async (primaryId) => {
    const [rows] = await db.execute(
        `select * from Contact where (id = ? OR linkedId = ?)`,
        [primaryId, primaryId]
    );
    return rows;
};

const getMailsfromContact = async(email) => {
    const [emails] = await db.execute(
        `select * from Contact where email = ?`, [email]
    )

    return emails;
}

const getPhonesfromContact = async(phone) => {
    const [phones] = await db.execute(
        `select * from Contact where phoneNumber = ?`, [phone]
    )
    return phones;
}


module.exports = {getRecordsByEmailorPhone, createRecord, updateRecordUsingId, getRecordsByEmailandPhone, updateRecordUsingLinkedId, getContactsByLinkedId, getMailsfromContact, getPhonesfromContact};