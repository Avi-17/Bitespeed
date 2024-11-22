const db = require("../config/db.js")

const getData = async(req, res) => {
    const [allData] = await db.execute(
        `select * from Contact`
    );

    return res.status(200).json({"data": allData});
}

module.exports = getData 
