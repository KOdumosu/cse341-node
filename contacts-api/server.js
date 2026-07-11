require("dotenv").config();

const express = require("express");
const { initDb } = require("./data/database");

const contactsRoute = require("./routes/contacts");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Contacts API is running!");
});

app.use("/contacts", contactsRoute);

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });