const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const db = await connectDB();
    const students = await db.collection('students').find().toArray();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one student
exports.getStudentById = async (req, res) => {
  try {
    const db = await connectDB();

    const student = await db.collection('students').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST student
exports.createStudent = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('students').insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT student
exports.updateStudent = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('students').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};