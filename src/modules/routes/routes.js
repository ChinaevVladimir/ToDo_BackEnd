const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  daleteTask,
} = require("../controllers/taskController");

router.get("/allTasks", getAllTasks);
router.post("/createTasks", createNewTask);
router.patch("/updateTasks", changeTaskInfo);
router.delete("/deleteTasks", daleteTask);

module.exports = router;
