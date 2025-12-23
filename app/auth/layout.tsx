import { useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import supabase from "supabase/supabase";

export async function loader() {
  // e.g., read a cookie/session and redirect signed-in users
  const isSignedIn = false; // replace with real check
  if (isSignedIn) throw redirect("/app");
  return null;
}

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // console.log(session);

      if (session) {
        navigate("/reward");

        console.log(session);
      }
    };

    checkUser();
  }, []);
  return (
    <div className="min-h-dvh grid place-items-center bg-primary-600">
      <main className="w-full max-w-100 rounded-xl p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
