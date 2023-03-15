import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("hej dååå");
});
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptionn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Question = mongoose.model("questions", questionSchema);
app.get("/questions", async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
});

app.get("/questions/:id", async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.send(question);
});

app.listen(3000, () => {
  mongoose.connect(
    "mongodb+srv://samatar:samatar@cluster0.um40t1s.mongodb.net/techhub?retryWrites=true&w=majority"
  );
});
