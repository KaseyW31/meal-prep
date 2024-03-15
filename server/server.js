import express from "express";
import cors from "cors";
import ingredients from "./routes/ingredient.js";
import meals from "./routes/meal.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/ingredient", ingredients);
app.use("/meal", meals);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});