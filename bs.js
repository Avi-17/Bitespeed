const updatedSecondPrimary = await pool.query(
    "UPDATE Users SET linkedId = ?, linkPrecedence = ? WHERE id = ?",
    [firstPrimary, "secondary", secondPrimary]
);
const updateSecondPrimaryDescendants = await pool.query(
    "UPDATE Users SET linkedId = ? WHERE linkedId = ?",
    [firstPrimary, secondPrimary]
);