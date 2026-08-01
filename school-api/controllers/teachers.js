const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const db = await connectDB();
    const teachers = await db.collection('teachers').find().toArray();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one teacher
exports.getTeacherById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid teacher ID."
      });
    }

    const db = await connectDB();

    const teacher = await db.collection('teachers').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found."
      });
    }

    res.status(200).json(teacher);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST teacher
exports.createTeacher = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      department,
      qualification,
      phone,
      yearsOfExperience
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !department ||
      !qualification ||
      !phone ||
      yearsOfExperience === undefined
    ) {
      return res.status(400).json({
        message: "All teacher fields are required."
      });
    }

    const db = await connectDB();

    const result = await db.collection('teachers').insertOne({
      firstName,
      lastName,
      email,
      department,
      qualification,
      phone,
      yearsOfExperience
    });

    res.status(201).json({
      message: "Teacher created successfully.",
      insertedId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT teacher
exports.updateTeacher = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid teacher ID."
      });
    }

    const {
      firstName,
      lastName,
      email,
      department,
      qualification,
      phone,
      yearsOfExperience
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !department ||
      !qualification ||
      !phone ||
      yearsOfExperience === undefined
    ) {
      return res.status(400).json({
        message: "All teacher fields are required."
      });
    }

    const db = await connectDB();

    const result = await db.collection('teachers').updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          firstName,
          lastName,
          email,
          department,
          qualification,
          phone,
          yearsOfExperience
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Teacher not found."
      });
    }

    res.status(200).json({
      message: "Teacher updated successfully."
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE teacher
exports.deleteTeacher = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid teacher ID."
      });
    }

    const db = await connectDB();

    const result = await db.collection('teachers').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Teacher not found."
      });
    }

    res.status(200).json({
      message: "Teacher deleted successfully."
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};