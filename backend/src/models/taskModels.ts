import mongoose from "mongoose";

export interface taskInput {
  id: Number;
  text: String;
  day: String;
  reminder: Boolean;
}

export interface TaskDocument extends taskInput, mongoose.Document {
  id: Number;
  text: String;
  day: String;
  reminder: Boolean;
  created_at: Date;
  updated_ad: Date;
}

const taskSchema = new mongoose.Schema(
  {
    id: Number,
    text: String,
    day: String,
    reminder: Boolean,
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<TaskDocument>("Task", taskSchema);

export default Task;
