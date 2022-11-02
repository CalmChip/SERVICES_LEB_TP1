const mongoose = require("mongoose");

let schemaMessages = mongoose.Schema({
  _id: { type: String, required: true },
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  langue: { type: String, required: true },
  commentaires: { type: Array, required: true },
});

let Messages = (module.exports = mongoose.model("Messages", schemaMessages));

module.exports.getMessages = (callback, limit) => {
  Messages.find(callback).limit(limit);
};

module.exports.getMessagesById = (idMessage, callback) => {
  let filtre = { _id: idMessage };
  Messages.findById(filtre, callback);
};

module.exports.getMessagesByFilter = (filter, callback, limit) => {
  Messages.find({ description: { $regex: filter } }, callback).limit(limit);
};

module.exports.ajoutMessages = (mess, callback) => {
  mess.date = Date.now();
  Messages.create(mess, callback);
};

module.exports.deleteUnMessage = (idMessage, callback) => {
  let query = { _id: idMessage };
  Messages.deleteOne(query, callback);
};

module.exports.modifierUnMessage = (query, newMsg, callback) => {
  let filtre = { _id: query };
  let options = {};
  let nouveauMsg = {
    _id: newMsg._id,
    titre: newMsg.titre,
    auteur: newMsg.auteur,
    description: newMsg.description,
    date: Date.now(),
    langue: newMsg.langue,
    commentaires: newMsg.commentaires,
  };
  Messages.findOneAndUpdate(filtre, nouveauMsg, options, callback);
};
