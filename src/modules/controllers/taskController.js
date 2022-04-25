const Task = require("../../db/model/task/index");

module.exports.getAllTasks = (req, res) =>
  Task.find().then((result) => res.send({ data: result }));

module.exports.createNewTask = (req, res) => {
  const body = req.body;
  if (!(body.hasOwnProperty("text") && body.hasOwnProperty("isCheck"))) {
    res.status(422).send("add text or isCheck please!");
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
  try {
    if (
      !(
        body.hasOwnProperty("_id") &&
        (body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
      )
    ) {
      res.status(422).send("add value please!");
    } else {
      Task.updateOne({ _id: body._id }, body).then((result) =>
        Task.find().then((result) => res.send({ data: result }))
      );
    }
  } catch (err) {
    res.status(err).send(err);
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
