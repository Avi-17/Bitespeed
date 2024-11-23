// const { getRecordsByEmailorPhone, createRecord, updateRecord } = require("../models/contactModel");

// const identifyContact = async (req, res) => {
//     const {email, phoneNumber} = req.body;

//     if(!email && !phoneNumber){
//         return res.status(400).json({error: 'email or phoneNumber must be provided.'});
//     }

//     try {
//         const existingContacts = await getRecordsByEmailorPhone(email, phoneNumber);
//         console.log(existingContacts);

//         if(existingContacts.length === 0){
//             const newRecordId = await createRecord(email, phoneNumber);
//             return res.status(201).json({
//                 contact: {
//                     primaryContactId: newRecordId,
//                     emails: email ? [email] : [],
//                     phoneNumbers: phoneNumber ? [phoneNumber] : [],
//                     secondaryContactIds: []
//                 }
//             })
//         }

//         let primaryContact = existingContacts.find(contact => contact.linkedPrecedence === 'primary');
//         if(!primaryContact){
//             primaryContact = existingContacts[0];
//         }

//         const secondaryContactIds = [];

//         for(let i = 0; i < existingContacts.length; i++) {
//             if(existingContacts[i].id !== primaryContact.id && existingContacts[i].linkPrecedence === 'primary') {
//                 await updateRecord(existingContacts[i].id, {linkedId: primaryContact.id, linkPrecedence: 'secondary'});
//                 secondaryContactIds.push(existingContacts[i].id);
//             } else if(existingContacts[i].linkPrecedence === 'secondary') {
//                 secondaryContactIds.push(existingContacts[i].id);
//             }
//         }

//         if(!existingContacts.some(c => c.email === email && c.phoneNumber === phoneNumber)) {
//             const newRecordId = createRecord(email, phoneNumber, primaryContact.id, 'secondary');
//             secondaryContactIds.push(newRecordId);
//         }

//         const emails = [...new Set(existingContacts.map(c => c.email).filter(e => e))];
//         const phoneNumbers = [...new Set(existingContacts.map(c => c.phoneNumber).filter(p => p))];

//         res.status(200).json({
//             contact: {
//                 primaryContactId: primaryContact.id,
//                 emails: [primaryContact.email, ...emails.filter(e => e !== primaryContact.email)],
//                 phoneNumbers: [primaryContact.phoneNumber, ...phoneNumbers.filter(p => p !== primaryContact.phoneNumber)],
//                 secondaryContactIds: secondaryContactIds
//             }
//         })

        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({error: 'Internal Server Error.'})
//     }
// }


// module.exports = identifyContact;