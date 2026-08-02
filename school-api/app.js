require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const passport = require('./config/passport');

const connectDB = require('./database/connect');
const { swaggerUi, swaggerSpec } = require('./swagger');

const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const authRoutes = require('./routes/auth');

const app = express();


// Middleware
app.use(express.json());


// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),

    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Home route
app.get('/', (req, res) => {
  res.send('School API is running');
});


// Test route
app.get('/test', (req, res) => {
  res.send('Test route works');
});


// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Authentication routes
app.use('/auth', authRoutes);


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