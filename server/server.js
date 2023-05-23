const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const crypto = require("crypto");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

//Card Schema
const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
});
const CardModel = new mongoose.model("Cards", CardSchema);


app.get("/api", (req, res) => {
  res.send("welcome to out API!");
});

//CARDS CRUD
//GET ALL CARDS - MONGO DB
app.get("/api/cards", async (req, res) => {
  const { title } = req.query;
  const cards = await CardModel.find();
  if (!title) {
    res.status(200).send(cards);
  } else {
    const searchedCards = cards.filter((x) =>
      x.title.toLowerCase().trim().includes(title.toLowerCase().trim())
    );
    res.status(200).send(searchedCards);
  }
});
//GET Card BY ID - MONGO DB
app.get("/api/cards/:id", async(req, res) => {
  const { id } = req.params;
  const card = await CardModel.findById(id)
  res.status(200).send(card);
});
//DELETE card - MONGO DB
app.delete("/api/cards/:id",async(req, res) => {
  const id = req.params.id;
  //delete
  const deleteCard = await CardModel.findByIdAndDelete(id);
  res.status(203).send({
    message: `${deleteCard.title} deleted successfully!`,
  });
});
//POST Card - MONGO DB
app.post("/api/cards", async (req, res) => {
  const { title, description, imageURL } = req.body;
  const newCard = new CardModel({
    title: title,
    description: description,
    imageURL: imageURL,
  });
  await newCard.save();
  res.status(201).send({
    message: `${newCard.title} posted successfully`,
    payload: newCard,
  });
});
//EDIT Card - MONGO DB
app.put("/api/cards/:id", async(req, res) => {
  const id = req.params.id;
  const { title, description, imageURL } = req.body;
  const updatingCard = {title:title,description:description,imageURL:imageURL};
  await CardModel.findByIdAndUpdate(id,updatingCard);
  res.status(200).send(`${updatingCard.title} updated successfully!`);
});

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});

DB_PASSWORD = process.env.DB_PASSWORD;
DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
  console.log("Mongo DB connected!!!");
});