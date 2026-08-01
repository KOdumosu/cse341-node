require('dotenv').config();

const express = require('express');
const connectDB = require('./database/connect');
const { swaggerUi, swaggerSpec } = require('./swagger');

const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {res.send('School API is running'); });

// Test route
app.get('/test', (req, res) => {
  res.send('Test route works');
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(
        `📚 Swagger Docs: ${
          process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`
        }/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });