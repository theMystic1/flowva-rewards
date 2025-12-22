import { Outlet, redirect } from "react-router";

export async function loader() {
  // e.g., read a cookie/session and redirect signed-in users
  const isSignedIn = false; // replace with real check
  if (isSignedIn) throw redirect("/app");
  return null;
}

const AuthLayout = () => {
  return (
    <div className="min-h-dvh grid place-items-center bg-primary-600">
      <main className="w-full max-w-105 rounded-xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
