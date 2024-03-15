import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get meal list
router.get("/", async (req, res) => {
  let collection = await db.collection("meals");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get single meal
router.get("/:id", async (req, res) => {
  let collection = await db.collection("meals");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create new meal
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      ingredients: req.body.ingredients,
    };
    let collection = await db.collection("meals");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update meal
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        ingredients: req.body.ingredients,
      },
    };

    let collection = await db.collection("meals");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a meal
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("meals");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;