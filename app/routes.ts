import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./auth/layout.tsx", [
    route("signup", "./auth/signup.tsx"),
    route("login", "./auth/login.tsx"),
    // index("./auth/login.tsx"),
  ]),
  layout("./dashboard/layout.tsx", [
    route("reward", "./dashboard/reward/index.tsx"),
  ]),
] satisfies RouteConfig;
