import { getStoredTasks, storeTasks } from "./../data/tasks";
import NewTask, { links as newTaskLinks } from "./../components/NewTask";
import { json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

export default function addTask() {
  return (
    <NewTask/>
  )
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

async function validateFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!title || title.length === 0) {
    return {
      error: "Title is required.",
    };
  }

  if (!description || description.length === 0) {
    return {
      error: "Description is required.",
    };
  }

  return {
    title,
    description,
  };
}

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();

    const validationResult = await validateFormData(formData);

    const taskData = {
      title: validationResult.title,
      description: validationResult.description,
    };

    const existingTasks = await getStoredTasks();
    const id = new Date().toISOString();
    const updatedTasks = existingTasks.concat({
      id,
      ...taskData,
    });
    await storeTasks(updatedTasks);


    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });

    return redirect("/tasks");
  } catch (error) {
    console.error("Error processing form data:", error);
    
  }
}

// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();
//   const taskData = {
//     title: formData.get("title"),
//     description: formData.get("description"),
//   };

//   const existingTasks = await getStoredTasks();
//   const id = new Date().toISOString();
//   const updatedTasks = existingTasks.concat({
//     id,
//     ...taskData,
//   });
//   await storeTasks(updatedTasks);
//   await new Promise<void>((resolve) => {
//     setTimeout(() => resolve(), 2000);
//   });
//   return redirect("/tasks");
// }

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

export function links() {
  return [...newTaskLinks()];
}
