const express = require("express");

const router = express.Router();

const contactsController = require("../controllers/contacts");


router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.createContact);

router.put("/:id", contactsController.updateContact);

module.exports = router;