import { Task } from "./Task.tsx";

export function Form({
  task,
  setTask,
  addTask,
}: {
  task: Task;
  setTask: (value: ((prevState: Task) => Task) | Task) => void;
  addTask: (props: Task) => void;
}) {
  return (
    <>
      <form className="w-full max-w-sm mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={task.task_content}
            onChange={(e) => setTask({ ...task, task_content: e.target.value })}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={() => addTask(task)}
          >
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}
