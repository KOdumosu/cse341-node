require("dotenv").config();
const express = require("express");
const { initDb } = require("./data/database");
const { swaggerUi, swaggerSpec } = require("./swagger");
const contactsRoutes = require("./routes/contacts");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Contacts API is running!");
});

app.use("/contacts", contactsRoutes);

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
    console.error(err);
  });