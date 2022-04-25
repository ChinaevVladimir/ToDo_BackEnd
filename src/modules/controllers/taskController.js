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
  console.log(req.body);
  console.log(req.body._id);
  if (
    !(
      body.hasOwnProperty("_id") &&
      (body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
    )
  ) {
    res.send("add value please!");
  } else {
    console.log(req.body.isCheck);
    Task.updateOne({ _id: req.body._id }, req.body).then((result) =>
      Task.find().then((result) => res.send({ data: result }))
    );
  }
};

module.exports.daleteTask = (req, res) => {
  _id = req.query._id;
  if (!_id) {
    return res.status(422).send("Error! Params not correct");
  } else {
    Task.deleteOne({ _id }).then((result) =>
      Task.find().then((result) => res.send({ data: result }))
    );
  }
};
