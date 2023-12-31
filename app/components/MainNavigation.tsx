import { NavLink } from "@remix-run/react";

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addTask">Add Task</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks">View Tasks</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
