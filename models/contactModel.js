const db = require('../config/db');

const getRecordsByEmailorPhone = async(email, phoneNumber) => {
    const [records] = await db.execute(
        `select * from Contact where email = ${email} or phoneNumber = ${phoneNumber}`
    );
    return records;
}


const createRecord = async(email, phoneNumber, linkedId = null, linkedPrecedence= 'primary') => {
    const [newRecord] = await db.execute(
        `insert into Contact (email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt) values(?, ?, ?, ?, now(), now())`, [email, phoneNumber, linkedId, linkedPrecedence]

    )

    return newRecord.insertId;
}





module.exports = {getRecordsByEmailorPhone, createRecord}