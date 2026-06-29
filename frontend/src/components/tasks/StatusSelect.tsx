import { TaskStatus } from "../../types/task.types";

interface Props {
  value?: string;

  onChange: (value: TaskStatus) => void;
}

export default function StatusSelect({
  value,

  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block font-medium">Status</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskStatus)}
        className="w-full rounded-lg border p-3"
      >
        <option value={TaskStatus.TODO}>Todo</option>

        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>

        <option value={TaskStatus.DONE}>Done</option>
      </select>
    </div>
  );
}
