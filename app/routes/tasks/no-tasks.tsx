import { Link } from "@remix-run/react";

export const NoTasks: React.FC = () => (
  <li className="task">
    <p>No tasks found.</p>
    <p>
      <Link to="/add-task">Add one!</Link>
    </p>
  </li>
);
