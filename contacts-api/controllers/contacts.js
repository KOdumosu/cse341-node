const { getDb } = require("../data/database");

const getAll = async (req, res) => {
  try {
    const db = getDb();

    const result = await db
      .collection("contacts")
      .find();

    const contacts = await result.toArray();

    res.setHeader("Content-Type", "application/json");

    res.status(200).json(contacts);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAll
};