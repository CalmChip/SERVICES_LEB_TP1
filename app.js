const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", require("./routes/index"));
app.use("/css", express.static("./style"));

mongoose.connect(
  "mongodb+srv://CalmChip:QAZplm123098@usagers.cxlqpfn.mongodb.net/services_TP1"
);
let db = mongoose.connection;
db.on("error", (err) => {
  console.error("erreur de DB: ", err);
});
db.once("open", () => {
  console.log("Connexion a la BD OK");
});
app.listen(PORT, console.log("Service web fonctionnel sur PORT: ", PORT));
