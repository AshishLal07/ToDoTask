import { FilterQuery, UpdateQuery } from "mongoose";
import Task, { TaskDocument, taskInput } from "../models/taskModels";

export function addTask(input: taskInput) {
  try {
    return Task.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export function showTask() {
  try {
    return Task.find();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function toggleTask(query: FilterQuery<TaskDocument>) {
  const oldReminder = await Task.findOne(query);
  if (!oldReminder) {
    return oldReminder;
  }

  await Task.updateOne(query, { reminder: !oldReminder.reminder });

  await oldReminder.save();
  return oldReminder;
}

export async function deleteTask(query: FilterQuery<TaskDocument>) {
  const task = await Task.findOne(query);
  if (!task) {
    return task;
  }
  await Task.deleteOne(query);
  return task;
}
