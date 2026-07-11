const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db.collection("contacts").find();

    const contacts = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = mongodb.getDb();

    const result = await db
      .collection("contacts")
      .find({ _id: contactId });

    const contact = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
};