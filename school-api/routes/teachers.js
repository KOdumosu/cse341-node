const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management API
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Returns all teachers
 */
router.get('/', isAuthenticated, teachersController.getAllTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher found
 *       404:
 *         description: Teacher not found
 */
router.get('/:id', isAuthenticated, teachersController.getTeacherById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a teacher
 *     tags: [Teachers]
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
 *               department:
 *                 type: string
 *               qualification:
 *                 type: string
 *               phone:
 *                 type: string
 *               yearsOfExperience:
 *                 type: integer
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - department
 *               - qualification
 *               - phone
 *               - yearsOfExperience
 *     responses:
 *       201:
 *         description: Teacher created
 *       400:
 *         description: Invalid input
 */
router.post('/', isAuthenticated, teachersController.createTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update a teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
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
 *               department:
 *                 type: string
 *               qualification:
 *                 type: string
 *               phone:
 *                 type: string
 *               yearsOfExperience:
 *                 type: integer
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - department
 *               - qualification
 *               - phone
 *               - yearsOfExperience
 *     responses:
 *       200:
 *         description: Teacher updated
 *       400:
 *         description: Invalid input
 */
router.put(
  '/:id',
  isAuthenticated,
  teachersController.updateTeacher
);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher deleted
 *       404:
 *         description: Teacher not found
 */
router.delete(
  '/:id',
  isAuthenticated,
  teachersController.deleteTeacher
);

module.exports = router;