const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;
app.use(express.json());

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean,
});

const uri =
  "mongodb+srv://root:root@cluster0.9u3oi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {});

const Task = mongoose.model("tasks", taskScheme);

app.get("/allTasks", (req, res) =>
  Task.find().then((result) => res.send({ data: result }))
);

app.post("/createTasks", (req, res) => {
  const task = new Task(req.body);
  task.save().then((result) => res.send(result));
});

app.patch("/updateTask", (req, res) => {
  Task.updateOne({ _id: req.query.id }, req.body).then((result) =>
    Task.find({ _id: req.body.id }).then((result) => res.send(result))
  );
});

app.delete("/deleteTasks", (req, res) =>
  Task.deleteOne({ _id: req.query.id }).then((result) => res.send(result))
);

app.listen(7070, () => console.log("Example app listening on port 7070!"));
