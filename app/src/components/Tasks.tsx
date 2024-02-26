import { useEffect, useState } from "react";
import { Task } from "./Task.tsx";
import { Form } from "./Form.tsx";
import { toast, ToastContainer } from "react-toastify";
import { addNewTask, deleteTask, getTasks, updateTask } from "../utils/api.ts";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    id: undefined,
    task_name: "",
    task_content: "",
    completed: false,
  });

  function updateTasks() {
    getTasks()
      .then(({ data }) => {
        if (data && typeof data === "object") setTasks(data);
      })
      .catch(() => {
        toast("Server is down!");
      })
      .finally(() => {
        toast("Server is up!");
      });
  }

  function resetTask() {
    setTask({ task_content: "", task_name: "", completed: false });
  }

  useEffect(() => {
    updateTasks();
  }, []);

  function addTask(props: Task) {
    const query =
      "id" in props && typeof props.id === "number"
        ? updateTask(props)
        : addNewTask(props);

    query
      .then((resp) => {
        if (resp && typeof resp === "object" && "id" in resp) {
          setTasks([...tasks, { id: resp.id, ...props } as Task]);
          resetTask();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeTask(id: number) {
    deleteTask(id).then((resp) => {
      if (resp) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      }
    });
  }

  function toggleCompleted(id: number) {
    updateTask({ ...task, completed: !task.completed }).then((resp) => {
      if (resp) {
        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        setTasks(newTasks);
      } else {
        updateTasks();
      }
    });
  }

  function editTask(id: number) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }

  return (
    <div className="todo-list">
      <Form addTask={addTask} task={task} setTask={setTask} />
      <ul className="divide-y divide-gray-200 px-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={removeTask}
            editTask={editTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}
