import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const router = express.Router();

// Get list of all ingredients
router.get("/", async (req, res) => {
  let collection = await db.collection("ingredients");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get single ingredient
router.get("/:id", async (req, res) => {
  let collection = await db.collection("ingredients");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create new ingredient
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      qty: req.body.qty,
      unit: req.body.unit,
    };
    let collection = await db.collection("ingredients");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update ingredient
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        qty: req.body.qty,
        unit: req.body.unit,
      },
    };

    let collection = await db.collection("ingredients");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete ingredient
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("ingredients");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;