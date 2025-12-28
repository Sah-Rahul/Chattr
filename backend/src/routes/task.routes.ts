import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createTask,
  getMyCreatedTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controller/task.controller";

const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask);

taskRouter.get("/my-tasks", authMiddleware, getMyCreatedTasks);

taskRouter.get("/all", authMiddleware, getAllTasks);

taskRouter.patch("/:taskId", authMiddleware, updateTask);

taskRouter.delete("/:taskId", authMiddleware, deleteTask);

export default taskRouter;
