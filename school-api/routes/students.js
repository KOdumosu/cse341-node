const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management API
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Returns all students
 */
router.get('/', studentsController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       400:
 *         description: Invalid student ID
 *       404:
 *         description: Student not found
 */
router.get('/:id', studentsController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               course:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - course
 *               - age
 *               - gender
 *               - phone
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', studentsController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               course:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - course
 *               - age
 *               - gender
 *               - phone
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 */
router.put('/:id', studentsController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: Invalid student ID
 *       404:
 *         description: Student not found
 */
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;