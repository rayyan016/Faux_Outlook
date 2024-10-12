# Email Client with Pagination and Filtering

This is a **Next.js 14** project styled with **Tailwind CSS** and **Ant Design**. It provides an email client interface with features like filtering, pagination, marking emails as favorites, and storing read statuses using `localStorage`.

## Features

- **Pagination:** Displays up to 10 emails per page.
- **Filtering:** Filter emails by favorites, read, unread, or view all.
- **Favorite Emails:** Mark/unmark emails as favorites.
- **Read State Management:** Emails are marked read when opened.
- **LocalStorage Persistence:** Read and favorite emails persist across sessions.
- **Loading States:** Shows loading skeleton during API calls.

## Tech Stack

- **Next.js 14** (for SSR & routing)
- **Ant Design** (UI components)
- **Tailwind CSS** (custom styling)
- **Vercel** (Deployment platform)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rayyan016/Faux_Outlook.git
   cd Faux_Outlook
   ```
2. Install dependencies:
   ```bash
    npm install
   ```
3. Start the development server:
    ```bash
    npm run dev
    ```