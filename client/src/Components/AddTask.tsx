import { useState } from "react";
import { useTask } from "./TaskSource";

const AddTask = () => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const { tasks, onAdd } = useTask();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text) {
      alert("Please add task before the submit");
      return;
    }
    const id = tasks.length + 1;
    onAdd({ id, text, day, reminder });
    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form onSubmit={onSubmit} className="add-form">
      <div className="form-controll">
        <label>Task</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task here.."
        />
      </div>
      <div className="form-controll">
        <label>Day & Time</label>
        <input
          type="text"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
          placeholder="Add day here..."
        ></input>
      </div>
      <div className="form-controll form-controll-check">
        <label> Set reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={`${reminder}`}
          onChange={(e) => {
            setReminder(e.currentTarget.checked);
          }}
        ></input>
      </div>
      <input className="btn btn-block" type="submit" value="Save task"></input>
    </form>
  );
};

export default AddTask;
