const express = require("express");
const router = express.Router();
const Messages = require("../modeles/messages");

router.get("/", (requete, reponse) => {
  reponse.send("Utilisez /api/messages pour faire un GET des messages");
});

router.get("/api/messages", (req, res) => {
  Messages.getMessages((err, msg) => {
    if (err) throw err;
    res.json(msg);
  }, 250);
});

router.get("/api/messages/:id", (req, res) => {
  Messages.getMessagesById(req.params.id, (err, msg) => {
    if (err) throw err;
    res.json(msg);
  });
});

router.get("/api/messages/recherches/:texte", (req, res) => {
  Messages.getMessagesByFilter(
    req.params.texte,
    (err, msg) => {
      if (err) throw err;
      res.json(msg);
    },
    250
  );
});

router.post("/api/messages", (req, res) => {
  let newMessage = req.body;
  Messages.ajoutMessages(newMessage, (err, msg) => {
    if (err) throw err;
    res.json(msg);
  });
});

router.delete("/api/messages/:id", (req, res) => {
  Messages.deleteUnMessage(req.params.id, (err, msg) => {
    if (err) throw err;
    res.json(msg);
  });
});

router.put("/api/messages/:id", (req, res) => {
  let newMsg = req.body;
  Messages.modifierUnMessage(req.params.id, newMsg, (err, msg) => {
    if (err) throw err;
    res.json(msg);
  });
});

module.exports = router;
