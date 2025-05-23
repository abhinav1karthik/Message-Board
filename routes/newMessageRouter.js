const express = require("express");
const newMessageRouter = express.Router();
const messages = require("../messages");

newMessageRouter.get("/", (req, res) => {
  res.render("form");
});

newMessageRouter.post("/", (req, res) => {
  const { user, text } = req.body;
  messages.push({
    text: text,
    user: user,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = newMessageRouter;
