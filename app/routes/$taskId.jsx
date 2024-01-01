import { Link, json, useLoaderData } from "@remix-run/react";
import styles from "./../styles/taskDetails.css";
import { getStoredTasks } from "../data/tasks";
import { useEffect } from "react";

function TaskDetailsPage() {
  const task = useLoaderData();
  useEffect(() => {
    document.title = `${task.title}`;
  }, [task.title]);

  

  return (
    <main id="task-details">
      <header>
        <Link >delete</Link>
        <Link>Edit</Link>
        <nav>
          <Link to="/tasks">Back to all tasks</Link>
          <h1>{task.title}</h1>
        </nav>
      </header>
      <p id="task-details-content">{task.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const allTasks = await getStoredTasks();
  const taskId = params.taskId;
  const selectedTask = allTasks.find((task) => task.id === taskId);

  if (!selectedTask) {
    throw json({ message: "Could not find task!" }, { status: 404 });
  }

  return selectedTask;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default TaskDetailsPage;
