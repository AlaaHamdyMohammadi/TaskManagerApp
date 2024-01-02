import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import { loader, action, validateFormData } from "../routes/add-task";

test("renders loader data", async () => {
  function AddTask() {
    const data = useLoaderData() as { message: string };
    return <p>Message: {data.message}</p>;
  }

  const RemixStub = createRemixStub([
    {
      path: "/addTask",
      Component: AddTask,
      loader() {
        return json({ message: "hello" });
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.findByText("Message: hello"));
});

test("loader returns tasks when found", async () => {
  jest.mock("./../data/tasks", () => ({
    getStoredTasks: jest.fn().mockResolvedValue([
      { id: "1", title: "Task 1", description: "Description 1" },
      { id: "2", title: "Task 2", description: "Description 2" },
    ]),
  }));

  const tasks = await loader();
  expect(tasks).toEqual([
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
  ]);
});

test("action processes form data and redirects", async () => {
  const mockFormData = new FormData();

  mockFormData.append("title", "Task title");
  mockFormData.append("description", "Task description");

  fetchMock.mock("/tasks", 302);

  const response = await action({
    request: new Request("/tasks", { method: "POST", body: mockFormData }),
  });

  expect(response).toEqual(redirect("/tasks"));

  fetchMock.restore();
});

test("validateFormData handles form validation correctly", async () => {
  const formData = new FormData();
  formData.append("title", "Task title");
  formData.append("description", "Task description");

  const validationResult = await validateFormData(formData);
  expect(validationResult).toEqual({
    title: "Task title",
    description: "Task description",
  });
});
