const express = require("express");
const newMessageRouter = express.Router();
const db = require("../database/db");

newMessageRouter.get("/", (req, res) => {
  res.render("form");
});

newMessageRouter.post("/", async (req, res) => {
  try {
    const { user, text } = req.body;
    await db.createMessage(user, text);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message");
  }
});

module.exports = newMessageRouter;
