# Flowva Rewards Hub 🏆

A professional gamification and rewards experience built with **TypeScript** and **React Router v7** on the frontend and **Supabase** (Auth, DB, RLS) on the backend. It demonstrates real Supabase usage (OAuth, row-level queries/mutations, and atomic reward claims) with polished UX, clean component structure, and robust loading/empty/error handling.

## ✨ Feature Highlights

- **Auth (Supabase)**: Google OAuth + email/password. SSR-safe session access where needed, client-safe via Supabase JS.
- **Rewards Catalog**: Filtered tabs (All, Locked, Unlocked, Coming Soon) with correct enable/disable logic.
- **Atomic Redemption**: One-click “Claim” performs a guard-checked, single-transaction mutation (points ↓, user_rewards ↑, unique constraint enforced).
- **Streak Engine**: Daily check-in with yesterday/today rules and progressive milestones.
- **Optimistic UX**: TanStack Query for cached reads, optimistic updates, request cancellation, refetch on focus.
- **Polished States**: Skeletons, spinners, and dedicated empty/error UIs across screens.
- **Responsive UI**: TailwindCSS v4; mobile-first layout; accessible tabs and buttons; keyboard/ARIA patterns.

---

## 🧱 Tech Stack

| Area          | Choice                                 |
| ------------- | -------------------------------------- |
| Framework     | React Router v7 + TypeScript           |
| Backend/DB    | Supabase (Postgres, RLS, Auth)         |
| Data Fetching | TanStack Query                         |
| Styling       | Tailwind CSS v4                        |
| Animations    | Framer Motion (micro-transitions only) |
| Tooling       | Vite                                   |

---

## 📦 Project Structure (key folders)

```
src/
  app/
    auth/               # login/signup + layout
    dashboard/          # Dashboard -> layouts -> Rewards
    routes.tsx
  components/
    ui/                # buttons, inputs, skeletons, modal, toast adapter
  hooks/
    queries.ts         # TanStack Query keys + hooks
    useRewards.ts      # rewards list hook
    useRewardDerived.ts# derived claimability logic
    useUser.ts         # session + profile hydrator
  lib/
    supabase.ts        # browser client
    auth.ts            # getSession/getUser helpers
    rewards.ts         # reward queries + atomic claim mutation

  types/type.ts        # shared types (User, Reward, Claim)
```

---

## ⚙️ Setup & Local Development

### 1) Clone & Install

```bash
git clone <your-repo-url>
cd flowva-rewards
npm install
```

### 2) Supabase Project & Tables

Create a Supabase project, then in **Table Editor** create:

- **users** (extends `auth.users` profile)
  - `id: uuid` (PK, references `auth.users.id`)
  - `name: text`
  - `email: text` (indexed)
  - `avatar_url: text`
  - `total_points: int4` (default 0)
  - `streaks: int4` (default 0)
  - `last_claimed_at: timestamptz` (nullable)

- **rewards**
  - `id: uuid` (PK)
  - `name: text`
  - `description: text`
  - `emoji: text`
  - `qualifying_points: int4` (>=0)
  - `status: text` (`active`, `coming-soon`)
  - Index on `(status, qualifying_points)`

- **user_rewards** (junction table)
  - `id: uuid` (PK)
  - `user_id: uuid` (FK → users.id, cascade)
  - `reward_id: uuid` (FK → rewards.id, cascade)
  - **Unique** constraint on `(user_id, reward_id)` to prevent duplicates.

**RLS**: enable Row Level Security and add policies:

- `users`: users can `select`/`update` only their own row.
- `user_rewards`: users can `select` their rows; can `insert` rows where `user_id = auth.uid()`; cannot insert if `(user_id, reward_id)` already exists (the unique constraint catches this and we surface a friendly error).
- `rewards`: readable by all authenticated (or public if desired).

> You can also seed sample rewards via the Supabase SQL editor, or use the dashboard UI to insert records.

### 3) Auth Providers (Google)

In **Authentication → Providers → Google**, add your client id/secret.
Add to `.env`:

```bash
VITE_SUPABASE_URL="https://<YOUR_PROJECT>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY="<PUBLIC_ANON_KEY>"
```

**Local OAuth redirect** (Supabase): `http://localhost:5173/login` (add in Auth settings allowlist).

### 4) Run

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## 🚀 Deploy

- **Frontend**: Vercel/Netlify
- **Env**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` in the hosting provider.
- **Auth Redirects**: Add your production domain `/login` as a redirect in Supabase Auth.
- **CORS**: Supabase → Auth → URL configuration: add your deployed origin.

---

## 🔐 Real Supabase Usage

- **Auth**: `supabase.auth.signInWithOAuth({ provider: 'google' })`, session hydrated via `getSession()` and a `useUser()` hook.
- **Reads**: `from('rewards').select('*')` + TanStack Query (caching, refetch).
- **Atomic Claim** (`claimRewardAtomic`):
  1. Select user profile (points, last_claimed_at, streaks).
  2. Guard checks (already claimed? enough points?).
  3. Insert into `user_rewards` (unique constraint ensures no doubles).
  4. Update `users.total_points = total_points - qualifying_points`.
  5. On success → optimistic UI update; on failure → rollback UI & show error toast.
- **Streaks**: Utility `dayRelation(date)` determines `yesterday`/`today/other` to increment/reset correctly.

---

## 🧪 UI/States Expectations (per the brief)

- **Loading**: skeleton cards (grid), button spinners on sensitive actions.
- **Empty**: explicit empty messaging with “Try again” or “Explore rewards” links.
- **Error**: top-right toast + inline error banner; retry buttons where appropriate.
- **Disabled**: “Claim” button disables for locked items and during pending requests.

---

## ✅ Submission Checklist

- [ ] **GitHub repo** pushed and public.
- [ ] **Live URL** deployed (Vercel/Netlify).
- [ ] **README** includes: setup, environment, Supabase configuration, and deploy notes.
- [ ] **Assumptions & Trade-offs** documented (below).
- [ ] **Tests/Manual QA**: run through the smoke checklist.

---

## 🔎 Assumptions & Trade-offs

- **Single currency**: All rewards consume `total_points` (no tiers/currencies).
- **Claim ordering**: “Next to claim” is the first _unlocked_ reward by current sort (qualifying_points ascending). This is easy to reason about and matches typical gamification funnels.
- **Client-side orchestration**: Atomic claim is done with two statements guarded by unique constraint + RLS, which is sufficient here. For heavier integrity needs, move to a Postgres function (`rpc`) or use Supabase’s `pg` transactions.
- **RLS over backend**: We rely on RLS instead of a custom server. This simplifies deployment for the assessment and still demonstrates secure data access.

---

## 🧭 How to Use

1. **Sign in** (Google or email/password).
2. **The Journey** shows your points, today’s status, and streak.
3. **Rewards** list shows tabs with counts; “Claim” becomes available when requirements are met.
4. **Toasts/Modals** confirm success/failure; UI remains responsive and consistent via TanStack Query.

---

## 🧰 Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # lint
npm run typecheck # TypeScript checks
```

---

## 🔧 Troubleshooting

- **OAuth redirects to `/#access_token=…`**: Ensure your `redirectTo` matches the allowed list in Supabase and that your `/login` route reads the session from `supabase.auth.getSession()` on mount.
- **RLS “permission denied”**: Confirm policies exist for `select/insert/update` with `auth.uid()`.
- **Duplicate claims**: Check the unique constraint on `(user_id, reward_id)`; surface a `409` style error message to the user.

---

## 👤 Author

**Your Name**  
[LinkedIn](https://linkedin.com/in/placeholder) · [Twitter](https://twitter.com/placeholder) · [Portfolio](https://placeholder.com)

---

### Appendix: Quick Policy Sketch (RLS)

- **users (select/update)**:
  - `using ( id = auth.uid() )`
  - `with check ( id = auth.uid() )`

- **user_rewards (select/insert)**:
  - `using ( user_id = auth.uid() )`
  - `with check ( user_id = auth.uid() )`

- **rewards (select)**:
  - `using ( true )` (or only authenticated users)

> Add the **unique** index on `user_rewards (user_id, reward_id)`.
