import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "./../styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Task Manager App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <main id="content">
        <h1>TASKS</h1>
        <p>TASKS MANAGER APPLICATION</p>
        <p id="cta">
          <Link to="/addTask">Try Now!</Link>
        </p>
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}