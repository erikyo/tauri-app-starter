export type Task = {
  id?: number;
  task_name: string;
  task_content: string;
  completed?: boolean;
};

export function Task({
  task,
  deleteTask,
  toggleCompleted,
}: {
  task: Task;
  deleteTask: Function;
  toggleCompleted: Function;
}) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <li className="todo-item py-4">
      <div className="flex items-center">
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
          className={"ml-auto opacity-80 hover:opacity-100"}
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
