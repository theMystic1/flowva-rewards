// app/root.tsx (or ./app.tsx depending on your structure)
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";
import type { Route } from "./+types/root";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavProvider } from "contexts/nav-contsxt";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../app/styles/app.css";

/* -----------------------------------------------------------------------------
 * React Query: module-level singleton (safe across re-renders/HMR)
 * --------------------------------------------------------------------------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Flowva Rewards Hub" },
    { name: "description", content: "Claim rewards, track streaks, and grow." },
    { name: "theme-color", content: "#9013FE" },

    // Open Graph defaults
    { property: "og:title", content: "Flowva Rewards Hub" },
    {
      property: "og:description",
      content: "Gamified rewards powered by Supabase.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://your-domain.tld" },
    { property: "og:image", content: "/og-image.png" }, // optional
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export const links: Route.LinksFunction = () => [
  // Fonts (yours)
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
  },

  // Favicons
  // { rel: "icon", href: "/favicon.ico" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#9013FE" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Optional portal roots for modals/overlays (prevent runtime creation) */}
        <div id="modal-root" />
        <div id="toast-root" />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        {/* Your app routes render here */}
        <Outlet />
      </NavProvider>

      {/* Keep one toast system. React-Toastify includes a progress bar by default. */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light"
      />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // Defaults
  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let code: number | undefined;
  let devStack: string | undefined;

  // Handle thrown/returned responses
  if (isRouteErrorResponse(error)) {
    code = error.status;
    title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    message =
      error.status === 404
        ? "The page you are looking for doesn’t exist."
        : error.statusText || message;
  } else if (error instanceof Error) {
    // Generic errors
    message = error.message || message;
    if (import.meta.env.DEV && error.stack) devStack = error.stack;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-600">{message}</p>
        {typeof code === "number" && (
          <p className="mt-1 text-sm text-slate-500">Status code: {code}</p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() =>
              typeof window !== "undefined" ? window.location.reload() : null
            }
            className="inline-flex h-10 items-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
          >
            Reload
          </button>
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Go Home
          </Link>
        </div>

        {devStack && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-slate-500">
              Stack trace (dev only)
            </summary>
            <pre className="mt-3 max-w-full overflow-auto rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
              <code>{devStack}</code>
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
