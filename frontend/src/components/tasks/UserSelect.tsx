import type { User } from "../../types/user.types";

// interface Props {
//   users: User[];

//   value?: string;

//   onChange: (value: string) => void;
// }

// export default function UserSelect({
//   users,

//   value,

//   onChange,
// }: Props) {
//   return (
//     <div>
//       <label className="mb-2 block font-medium">Assign User</label>

//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-lg border p-3"
//       >
//         <option value="">Select User</option>

//         {users.map((user) => (
//           <option key={user.id} value={user.id}>
//             {user.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

interface Props {
  users: User[];
  value?: string;
  onChange: (value: string) => void;
}

export default function UserSelect({ users, value, onChange }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border p-3"
    >
      <option value="">Select User</option>

      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
