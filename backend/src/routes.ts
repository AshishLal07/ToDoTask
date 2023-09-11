import { Express } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  showTaskHandler,
  toggleTaskHandler,
} from "./controller/taskController";

export default function (app: Express) {
  // TODO api routes

  // POST add a task;
  app.post("/addTask", createTaskHandler);

  // GET show a task;
  app.get("/show", showTaskHandler);

  // GET DELETE a task;
  app.get("/delete/:id", deleteTaskHandler);

  // get toggle a reminder;

  app.get("/toggleReminder/:id", toggleTaskHandler);
}
