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


const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const result = await db.collection("contacts").insertOne(contact);

    res.status(201).json({
      insertedId: result.insertedId,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const db = mongodb.getDb();

    const result = await db.collection("contacts").replaceOne(
      { _id: contactId },
      contact
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Contact not found.",
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
};