const ContactModel = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { user_id, text, title } = req.body;
    const contact = await ContactModel.create({ user_id, text, title });
    return res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findOne(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, text, title } = req.body;
    const updatedContact = await ContactModel.update(id, {
      user_id,
      text,
      title,
    });

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactModel.delete(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const contacts = await ContactModel.findByUserId(userId);
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts by user ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactsByUserId,
};
