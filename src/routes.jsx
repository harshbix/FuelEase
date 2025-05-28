// routes.jsx
import { Router, Route, RootRoute, Outlet } from "@tanstack/react-router";
import Login from "./components/login/Login"; // ✅ from components folder
import Register from "./components/Register"; // ✅ from components folder

const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const routeTree = rootRoute.addChildren([loginRoute, registerRoute]);

export const router = new Router({ routeTree });
