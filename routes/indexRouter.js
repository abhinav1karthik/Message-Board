const express = require("express");
const indexRouter = express.Router();
const db = require("../database/db");

indexRouter.get("/", async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

indexRouter.get("/message/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = await db.getMessageById(id);

    if (!message) {
      return res.status(404).send("Message not found.");
    }

    res.render("message", {
      message: message,
      id: message.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = indexRouter;
