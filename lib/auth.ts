import { redirect } from "react-router";
import supabase from "supabase/supabase";

export const signinWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/reward",
      queryParams: {
        prompt: "select_account",
        // Optional: Add access_type: 'offline' if you need a refresh token
        access_type: "offline",
      },
    },
  });

  if (error) {
    console.error(error);
    return;
  }
};

export const handleSignupWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error);
    throw new Error(error.message, error);
  }

  if (data) {
    // redirect("/reward");
    return data;
  }
};

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }

  if (data) {
    // redirect("/reward");
    return data;
  }
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    // Redirect the user to the login or home page after logout
    window.location.href = "/login";
  }
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }

  if (data) {
    // redirect("/reward");
    return data;
  }
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }

  return data;
};
export const updateUser = async (id: string, value: any) => {
  const { data, error } = await supabase
    .from("users")
    .update(value)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Update error:", error.message);
    throw error;
  }

  return data;
};
