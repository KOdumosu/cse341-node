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
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID."
      });
    }

    const db = await connectDB();

    const student = await db.collection("students").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found."
      });
    }

    res.status(200).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// POST student
exports.createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      course,
      age,
      gender,
      phone
    } = req.body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !course ||
      !age ||
      !gender ||
      !phone
    ) {
      return res.status(400).json({
        message: "All student fields are required."
      });
    }

    const db = await connectDB();

    const result = await db.collection("students").insertOne({
      firstName,
      lastName,
      email,
      course,
      age,
      gender,
      phone
    });

    res.status(201).json({
      message: "Student created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// PUT student
exports.updateStudent = async (req, res) => {
  try {
    const db = await connectDB();

    if (!ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid student ID."
  });
}

    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: {
  firstName,
  lastName,
  email,
  course,
  age,
  gender,
  phone
    }}
    );

    if (result.matchedCount === 0) {
  return res.status(404).json({
    message: "Student not found."
  });
}

    res.status(200).json(result);
  } 

  catch (error) {
    res.status(500).json({ error: error.message });
  }

  const {
  firstName,
  lastName,
  email,
  course,
  age,
  gender,
  phone
} = req.body;

if (
  !firstName ||
  !lastName ||
  !email ||
  !course ||
  !age ||
  !gender ||
  !phone
) {
  return res.status(400).json({
    message: "All student fields are required."
  });
}
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const db = await connectDB();

    if (!ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid student ID."
  });
}
    const result = await db.collection('students').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
  return res.status(404).json({
    message: "Student not found."
  });
}
res.status(200).json({
  message: "Student deleted successfully."
});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
