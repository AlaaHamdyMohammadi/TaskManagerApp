interface Task {
  id: string;
  title: string;
  content: string;
}

interface TaskListProps {
  tasks: Task[];
}
