const Task = require("../../db/model/task/index");

module.exports.getAllTasks = (req, res) =>
  Task.find().then((result) => res.send({ data: result }));

module.exports.createNewTask = (req, res) => {
  const body = req.body;
  if (!(body.hasOwnProperty("text") && body.hasOwnProperty("isCheck"))) {
    res.send("add text or isCheck please!");
  } else {
    const task = new Task(req.body);
    task
      .save()
      .then((result) =>
        Task.find().then((result) => res.send({ data: result }))
      );
  }
};

module.exports.changeTaskInfo = (req, res) => {
  const body = req.body;
  if (
    !(
      body.hasOwnProperty("id") &&
      (body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
    )
  ) {
    res.send("add value please!");
  } else {
    Task.updateOne({ _id: req.query.id }, req.body).then((result) =>
      Task.find().then((result) => res.send({ data: result }))
    );
  }
};

module.exports.daleteTask = (req, res) => {
  if (!req.query.id) return res.status(422).send("Error! Params not correct");
  else {
    Task.deleteOne({ _id: req.query.id }).then((result) =>
      Task.find().then((result) => res.send({ data: result }))
    );
  }
};
