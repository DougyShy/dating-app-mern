import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://dougscheible:fossil69@cluster1.2l0ue.mongodb.net/datingDB?retryWrites=true&w=majority&appName=dating-app-mern";

// Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));

app.post("/dating/cards", async (req, res) => {
  /*const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });*/
  const dbCard = req.body;
  Cards.create(dbCard)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/dating/cards", async (req, res) => {
  try {
    const data = await Cards.find(); // Mongoose's find() returns a promise
    res.status(200).send(data); // Send the data if successful
  } catch (err) {
    res.status(500).send(err); // Catch any errors and send a 500 response
  }
});

app.delete("/dating/cards", async (req, res) => {
  try {
    const result = await Cards.deleteMany({}); // Empty filter deletes all documents
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: `${result.deletedCount} card(s) deleted successfully.`,
      });
    } else {
      res.status(404).send({ message: "No cards found to delete." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
