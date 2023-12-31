import { Link } from "@remix-run/react";
import styles from "./TaskList.css";

interface Task {
  id: string;
  title: string;
  content: string;
}

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <ul id="task-list">
      {tasks.map((task, index) => (
        <li key={task.id} className="task">
          <Link to={`/${task.id}`}>
            <article>
              <header>
                <ul className="task-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={task.id}>
                      {new Date(task.id).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{task.title}</h2>
              </header>
              <p>{task.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
