import { MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredTasks } from "~/data/tasks";
import { NoTasks } from "./no-tasks";
import styles from "./TaskList.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ([
  { title: "All Tasks" },
]);

export async function loader() {
  const tasks = await getStoredTasks();
  return json(tasks);
};


function TasksPage() {
  const tasks = useLoaderData<typeof loader>();

  return (
    <ul id="task-list">
      {tasks.length === 0 && (
        <NoTasks />
      )}
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
};

interface ErrorBoundaryProps {
  error?: {
    message: string;
  };
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <>
      <main className="error">
        <p>Could not found any tasks.</p>
        {error && <p>{error.message}</p>}
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    </>
  );
}

export default TasksPage;
