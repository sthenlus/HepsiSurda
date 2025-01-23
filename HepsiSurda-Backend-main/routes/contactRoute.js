const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactsByUserId,
} = require("../controllers/contactController");

// Retrieve all contacts
router.get("/", getAllContacts);

// Retrieve a single contact by id
router.get("/:id", getContact);

// Retrieve all contacts for a specific user
router.get("/user/:userId", getContactsByUserId);

// Create a new contact
router.post("/", createContact);

// Update a contact
router.patch("/:id", updateContact);

// Delete a contact
router.delete("/:id", deleteContact);

module.exports = router;
