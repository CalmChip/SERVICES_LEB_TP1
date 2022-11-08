const express = require("express");
const router = express.Router();
const Messages = require("../modeles/messages");

router.get("/", (requete, reponse) => {
  affichePageWeb("pageWeb.html", reponse);
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

function affichePageWeb(filename, response) {
  const fs = require("fs");
  const path = require("path");
  filename = path.join(__dirname, "..", "/", filename);
  fs.readFile(filename, (err, data) => {
    if (err) {
      response.status(500).send("Erreur serveur web: " + err.code);
    } else {
      response.status(200).set({ "Content-type": "text/html" }).send(data);
    }
  });
}

module.exports = router;
