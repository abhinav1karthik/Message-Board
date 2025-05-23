const express = require("express");
const indexRouter = express.Router();
const messages = require("../messages");

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages[id];

  if (!message) {
    return res.status(404).send("Message not found.");
  }

  res.render("message", { message: message, id: id });
});

module.exports = indexRouter;
