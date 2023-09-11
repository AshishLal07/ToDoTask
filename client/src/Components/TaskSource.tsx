import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const TaskContext = createContext<ReturnType<typeof useTaskSource>>(
  {} as unknown as ReturnType<typeof useTaskSource>,
);

export interface Task {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
}
type taskState = {
  tasks: Task[];
};
type taskAction =
  | { type: "setTask"; payload: Task[] }
  | { type: "onDelete"; payload: Task[]; id: number }
  | { type: "OnToggleReminder"; payload: Task[]; id: number }
  | { type: "OnAddTask"; payload: Task };

function reducer(state: taskState, action: taskAction): taskState {
  switch (action.type) {
    case "setTask":
      return { ...state, tasks: action.payload };
    case "onDelete":
      deleteTask(action.id);
      // state is read-only,don't modify instead
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "OnToggleReminder":
      toggleReminder(action.id);
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, reminder: !t.reminder } : t,
        ),
      };
    case "OnAddTask":
      addTask(action.payload);
      return { ...state, tasks: [...state.tasks, action.payload] };

    default:
      return state;
  }
}

// Adding reminder to tasks and API
const addTask = async (task: Task) => {
  await fetch("http://localhost:8005/addtask", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

// delete from API
const deleteTask = async (id: number) => {
  await fetch(`http://localhost:8005/delete/${id}`);
};
// on toggle the reminder
const toggleReminder = async (id: number) => {
  await fetch(`http://localhost:8005/toggleReminder/${id}`);
};

const fetchTask = async () => {
  const resp = await fetch("http://localhost:8005/show");
  const data = await resp.json();
  const dataForm = data.tasks.map((d: Task) => ({
    id: d.id,
    text: d.text,
    reminder: d.reminder,
    day: d.day,
  }));
  return dataForm;
};

function useTaskSource(): {
  tasks: Task[];
  onDelete: (id: number) => void;
  OnToggleReminder: (id: number) => void;
  onAdd: (task: Task) => void;
} {
  // const [tasks,setTask] = useState<Task[]>([]);

  const [{ tasks }, dispatch] = useReducer(reducer, { tasks: [] });
  // always add a return type to reducer function avoid error

  const onDelete = useCallback(
    (id: number) => {
      dispatch({
        type: "onDelete",
        payload: tasks,
        id: id,
      });
    },
    [tasks],
  );

  const OnToggleReminder = useCallback(
    (id: number) => {
      dispatch({
        type: "OnToggleReminder",
        payload: tasks,
        id: id,
      });
    },
    [tasks],
  );

  const onAdd = useCallback((task: Task) => {
    dispatch({
      type: "OnAddTask",
      payload: task,
    });
  }, []);

  useEffect(() => {
    const getTask = async () => {
      const dataFromserver = await fetchTask();
      dispatch({
        type: "setTask",
        payload: dataFromserver,
      });
    };
    getTask();
  }, []);

  return { tasks, onDelete, OnToggleReminder, onAdd };
}

export function useTask() {
  return useContext(TaskContext);
}

const TaskSource = ({ children }: { children: React.ReactNode }) => {
  return (
    <TaskContext.Provider value={useTaskSource()}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskSource;
