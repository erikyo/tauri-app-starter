import { Task } from "./Task.tsx";
import {useIntl} from "react-intl";

export function Form({
  task,
  setTask,
  addTask,
}: {
  task: Task;
  setTask: (value: ((prevState: Task) => Task) | Task) => void;
  addTask: (props: Task) => void;
}) {
    const intl = useIntl();
  return (
    <>
      <form className="w-full mx-auto px-4 py-2">
        <div className="flex flex-col items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={task.task_name}
            onChange={(e) => setTask({ ...task, task_name: e.target.value })}
          />
        </div>

        <textarea
          className="appearance-none bg-slate-50 border-none w-full h-20 text-gray-700 py-1 px-2 mt-4 leading-tight focus:outline-none"
          value={task.task_content}
          placeholder="Description"
          onChange={(e) => setTask({ ...task, task_content: e.target.value })}
        />

        <button
          className="w-full bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white my-2 mr-0 py-1 px-2 rounded"
          type="button"
          onClick={() => addTask(task)}
        >
            {intl.formatMessage({id: 'form.btn'}, {name: 'Add Task'})}
        </button>
      </form>
    </>
  );
}
