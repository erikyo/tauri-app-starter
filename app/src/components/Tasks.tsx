import { useEffect, useState } from "react";
import { Task } from "./Task.tsx";
import { Form } from "./Form.tsx";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    task_name: "",
    task_content: "",
  });
  const env = import.meta.env;

  useEffect(() => {
    axios
      .get("http://" + env.HTTP_HOST + ":" + env.HTTP_PORT + "/task")
      .then(({ data }) => {
        console.log(data);
        if (data && typeof data === "object") setTasks(data);
      });
  }, []);

  function resetTask() {
    setTask({ task_content: "", task_name: "", completed: false });
  }

  function addTask(props: Task) {
    const newTask = {
      id: tasks.length + 1,
      task_name: props.task_name,
      task_content: props.task_content,
    };
    setTasks([...tasks, newTask]);
    resetTask();
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  }

  return (
    <div className="todo-list">
      <Form addTask={addTask} task={task} setTask={setTask} />
      <ul className="divide-y divide-gray-200 px-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
}
