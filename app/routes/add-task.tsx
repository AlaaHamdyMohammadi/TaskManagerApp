import { getStoredTasks, storeTasks } from "../data/tasks";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { validateFormData } from "~/utils";
import styles from "./NewTask.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const validationResult = await validateFormData(formData);

  if (validationResult.error) {
    return json(validationResult.error);
  };

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
  return redirect("/tasks");
};

export default function addTask() {
  const navigation = useNavigation();
  const error = useActionData<typeof action>();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="task-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" />
      </p>
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add task'}</button>
      </div>
    </Form>
  );
};

interface ErrorBoundaryProps {
  error?: {
    message: string;
  };
};

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <main className="error">
      <p>Could not found any tasks.</p>
      {error && <p>{error.message}</p>}
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
};
