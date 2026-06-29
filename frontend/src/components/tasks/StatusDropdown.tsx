import { TaskStatus } from "../../types/task.types";

interface Props {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
}

export default function StatusDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
      className="rounded-md border border-gray-300 px-3 py-2"
    >
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  );
}
