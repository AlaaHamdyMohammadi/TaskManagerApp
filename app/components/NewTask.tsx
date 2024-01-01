import { Form, useNavigation } from "@remix-run/react";
import styles from "./NewTask.css";

function NewTask() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="task-form">
       
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add task'}</button>
      </div>
    </Form>
  );
}

export default NewTask;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
