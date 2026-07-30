const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const db = await connectDB();
    const teachers = await db.collection('teachers').find().toArray();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one teacher
exports.getTeacherById = async (req, res) => {
  try {
    const db = await connectDB();

    const teacher = await db.collection('teachers').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST teacher
exports.createTeacher = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('teachers').insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT teacher
exports.updateTeacher = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('teachers').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('teachers').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};