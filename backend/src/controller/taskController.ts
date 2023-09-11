import { Request, Response } from "express";
import {
  addTask,
  showTask,
  toggleTask,
  deleteTask,
} from "../service/taskService";
import log from "../logger";

export async function createTaskHandler(req: Request, res: Response) {
  try {
    const task = await addTask(req.body);
    return res.status(200).json({ msg: "Added Successfully" });
  } catch (e: any) {
    log.error(e);
    return res.status(409).json({ err: e.message });
  }
}

export async function showTaskHandler(req: Request, res: Response) {
  try {
    const allTask = await showTask();
    return res.status(200).json({ tasks: allTask });
  } catch (error: any) {
    return res.status(400).json({ err: error.message });
  }
}

export async function toggleTaskHandler(req: Request, res: Response) {
  const { id } = req.params;

  const task = await toggleTask({ id });
  if (!task) {
    return res.status(404).json({ err: "Invalid Request" });
  }
  return res.status(200).json({ msg: "toggled Successfully" });
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const { id } = req.params;

  const task = await deleteTask({ id });
  if (!task) {
    return res.status(404).json({ err: "Invalid Request" });
  }
  return res.status(200).json({ msg: "toggled Successfully" });
}
