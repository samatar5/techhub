import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hej dååå");
});
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.send(404).send("hittade inte frågan");
    }
    res.send(question);
  } catch (error) {
    res.send(404).send("hittade inte frågan");
  }
});

app.post("/question", async (req, res) => {
  const question = await Question.create({
    title: req.body.title,
    description: req.body.description,
  });
  res.send(question);
});

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "questions",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

app.post("/questions/:id/comment", async (req, res) => {
  const comment = await Comment.create({
    text: req.body.text,
    questionId: req.params.id,
  });
  res.send(comment);
});

app.listen(3000, () => {
  mongoose.connect(
    "mongodb+srv://samatar:samatar@cluster0.um40t1s.mongodb.net/techhub?retryWrites=true&w=majority"
  );
});
