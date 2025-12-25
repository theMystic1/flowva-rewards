# Flowva Rewards Hub 🏆

## Overview
Flowva Rewards is a professional gamification platform and rewards management system built with **TypeScript** and **Node.js** using the **React Router v7** framework. It leverages **Supabase** as a robust backend-as-a-service to manage authentication, real-time data synchronization, and atomic point transactions for user growth and retention.

## Features
- **Authentication**: Secure onboarding via Supabase Auth, supporting both Google OAuth and traditional Email/Password credentials.
- **Streak Engine**: A logic-heavy daily check-in system that tracks user consistency and awards incremental points based on activity logs.
- **Referral Tracking**: Dynamic generation of unique referral codes with automated point allocation for successful invitations.
- **Atomic Reward Redemption**: Secure "claim" functionality that ensures point-to-reward transactions are atomic and synchronized with the database state.
- **Optimistic UI Management**: Real-time interface updates powered by TanStack Query for a zero-latency user experience during point claims.
- **Responsive Architecture**: A mobile-optimized dashboard built with Tailwind CSS v4 and Framer Motion for smooth transitions.

## Getting Started

### Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd flowva-rewards
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development Mode**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

### Environment Variables
To run this project, you must configure the following environment variables in a `.env` file located in the root directory:

| Variable | Example | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://xyz.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `eyJhbGciOiJIUzI1NiI...` | Your Supabase anonymous/public API key |

## API Documentation

### Base URL
`https://[your-supabase-project].supabase.co`

### Endpoints

#### GET /auth/user
**Request**:
Handled via `supabase.auth.getSession()` and the `useUser` hook. Requires a valid JWT in the local storage.

**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "user_metadata": {
    "name": "John Doe",
    "avatar_url": "https://..."
  }
}
```

**Errors**:
- 401: Unauthorized session or expired token.

#### POST /api/v1/auth/register
**Request**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "user": { "id": "uuid", "email": "..." },
  "session": { "access_token": "...", "refresh_token": "..." }
}
```

**Errors**:
- 400: User already exists or weak password.

#### POST /api/v1/rewards/claim
**Request**:
```json
{
  "reward_id": "string",
  "user_id": "string"
}
```

**Response**:
```json
{
  "status": "success",
  "points_remaining": 4500,
  "transaction_id": "uuid"
}
```

**Errors**:
- 403: Insufficient qualifying points.
- 409: Reward already claimed.

## Technologies Used
| Category | Technology |
| :--- | :--- |
| **Framework** | [React Router v7](https://reactrouter.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database/Auth** | [Supabase](https://supabase.com/) |
| **State Management** | [TanStack Query](https://tanstack.com/query) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **DevOps** | [Docker](https://www.docker.com/) |

## Usage
The application is divided into two primary contexts: authentication and the dashboard. 

1. **Authentication Flow**: Users must sign up to generate a `ref_code`. The `AuthLayout` automatically checks for active sessions and redirects authenticated users to the rewards hub.
2. **The Journey**: Found in the dashboard, this section displays the point balance and progress bars. Users can click "Claim Today's Points" once every 24 hours. The logic checks the `last_claimed_at` timestamp to prevent double-claiming.
3. **Rewards Redemption**: Users can browse active rewards. The "Claim" button is enabled only if the user's `total_points` meet or exceed the `qualifying_points` for that specific item.
4. **Referral Management**: Users can copy their unique referral link. Sharing is integrated with WhatsApp, X (Twitter), LinkedIn, and Facebook via social sharing hooks.

## Contributing
- 🚀 Fork the repository and create your feature branch.
- 📝 Ensure all TypeScript types are correctly defined in `types/type.ts`.
- 🧪 Run `npm run typecheck` before submitting a pull request.
- 📬 Open a PR with a detailed description of your changes.

## Author
**[Your Name]**
- [LinkedIn](https://linkedin.com/in/placeholder)
- [Twitter](https://twitter.com/placeholder)
- [Portfolio](https://placeholder.com)

## Dynamic Badges
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)