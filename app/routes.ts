import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  layout("./auth/layout.tsx", [
    route("signup", "./auth/signup.tsx"),
    route("login", "./auth/login.tsx"),
  ]),

  layout("./dashboard/layout.tsx", [
    // "/" under /dashboard → redirect to /reward
    index("./dashboard/redirect-to-reward.tsx"),
    // "/reward" → actual rewards page
    route("reward", "./dashboard/reward/index.tsx"),
  ]),
] satisfies RouteConfig;
