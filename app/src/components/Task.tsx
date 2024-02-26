export type Task = {
  id?: number;
  task_name: string;
  task_content: string;
  completed?: boolean;
};

export function Task({
  task,
  deleteTask,
  editTask,
  toggleCompleted,
}: {
  task: Task;
  deleteTask: Function;
  editTask: Function;
  toggleCompleted: Function;
}) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <li className="todo-item py-4">
      <div className="flex items-center group">
        <input
          id="completed"
          name="completed"
          type="checkbox"
          checked={task.completed}
          onChange={handleChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label
          htmlFor="todo1"
          className="ml-3 block items-center text-gray-900"
        >
          <span className="text-lg font-medium">{task.task_name}</span>
          <span className="ml-3 text-sm font-light text-gray-500">
            {task.task_content}
          </span>
        </label>
        <button
          className={"mr-auto ml-3 opacity-0 group-hover:opacity-90"}
          onClick={() => editTask(task.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 0 24 24"
            width="22"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button
          className={"opacity-70 hover:opacity-90"}
          onClick={() => deleteTask(task.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </li>
  );
}
