/* eslint-disable @typescript-eslint/no-unused-vars */
import { getStoredTasks, storeTasks } from "../data/tasks";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import NewTask, { links as newTaskLinks } from "./../components/NewTask";
import TaskList, { links as taskListLinks } from "./../components/TaskList";
import { useEffect } from "react";

function TasksPage() {
  const tasks = useLoaderData();

  useEffect(() => {
    document.title = "All Tasks";
  }, []);

  return (
    <main>
      <NewTask />
      <TaskList tasks={tasks} />
    </main>
  );
}

export async function loader() {
  const tasks = await getStoredTasks();
  if (!tasks || tasks.length === 0) {
    throw json(
      { message: "Could not found any tasks." },
      {
        status: 404,
        statusText: "Not Found.",
      }
    );
  }
  return tasks;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const taskData = {
    title: formData.get("title"),
    content: formData.get("description"),
  };

  const existingTasks = await getStoredTasks();
  const id = new Date().toISOString();
  const updatedTasks = existingTasks.concat({
    id,
    ...taskData,
  });
  await storeTasks(updatedTasks);
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), 2000);
  });
  return redirect("/tasks");
}

export function links() {
  return [...newTaskLinks(), ...taskListLinks()];
}

interface ErrorBoundaryProps {
  error?: {
    message: string;
  };
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <>
      <NewTask />
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
