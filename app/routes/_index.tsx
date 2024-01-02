import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "./../styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Task Manager App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
};

// CAMEL CASE: addTask
// KEBAB CASE: add-task <-- convention for routes
// PASCAL CASE: AddTask

export default function Index() {
  return (
    <main id="content">
      <h1>TASKS</h1>
      <p>TASKS MANAGER APPLICATION</p>
      <p id="cta">
        <Link to="/add-task">Try Now!</Link>
      </p>
    </main>
  );
}
