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
  const apiUrl = "http://" + env.HTTP_HOST + ":" + env.HTTP_PORT;
  const taskEndPoint = apiUrl + "/task";

  useEffect(() => {
    axios.get(taskEndPoint).then(({ data }) => {
      console.log(data);
      if (data && typeof data === "object") setTasks(data);
    });
  }, []);

  function resetTask() {
    setTask({ task_content: "", task_name: "", completed: false });
  }

  function addTask(props: Task) {
    const newTask = {
      task_name: props.task_name,
      task_content: props.task_content,
    };
    axios
      .post(taskEndPoint, newTask)
      .then((resp) => {
        if (resp && typeof resp === "object" && "id" in resp)
          setTasks([...tasks, { id: resp.id, ...newTask } as Task]);
        resetTask();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTask(id: number) {
    axios.delete(taskEndPoint + id).then((resp) => {
      if (resp) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function toggleCompleted(id: number) {
    axios.post(taskEndPoint + id);
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
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
