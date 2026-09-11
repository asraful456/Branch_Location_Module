# Branch Location Management System (Demo)

A frontend demo of the Branch Location module, built with **React + Vite +
Tailwind CSS**, using **json-server** as a mock backend. This project is
for demonstration purposes: it shows both the **User View** and the
**Admin View** side by side (no login/authentication flow), so both
interfaces can be reviewed and demoed easily.

## Tech Stack

- React (Vite)
- Tailwind CSS
- json-server (mock REST API)
- react-icons

## Project Structure

```
src/
├── api/
│   └── branchApi.js
├── components/
│   ├── Card.jsx
│   ├── Create.jsx
│   ├── UpdateEdit.jsx
│   ├── Delete.jsx
│   └── StatCard.jsx
├── pages/
│   ├── UserView.jsx
│   └── AdminView.jsx
├── App.jsx
└── index.css

db.json
.env
```

## Requirements

- Node.js (v18 or newer recommended)
- npm

## Setup

Install all dependencies first:

```bash
npm install
```

## Running the Project

This project needs **two things running at the same time**: the mock API
server (json-server) and the frontend (Vite dev server). Open two terminal
windows/tabs for this.

### 1. Start the mock API server (json-server)

In the first terminal:

```bash
npm run server
```

This starts json-server on **http://localhost:3001**, serving the data
from `db.json`. You should see a message like:

```
JSON Server started on PORT :3001
Endpoints:
http://localhost:3001/branches
```

Leave this terminal running.

### 2. Start the frontend (Vite)

In a second terminal:

```bash
npm run dev
```

This starts the React app, usually on **http://localhost:5173**. Open that
URL in your browser.

### 3. Using the app

- You will see a small "Demo mode" bar at the top with two buttons:
  **User View** and **Admin View**. Click either one to switch, instead of
  going through a login flow.
- **User View**: browse all branches, filter by division, and search by
  name or address. Read-only, no edit/delete buttons are shown here.
- **Admin View**: same branch list, but with **Add Branch**, **Edit**, and
  **Delete** actions available on each card.

## About the Data

The mock data in `db.json` is for demonstration only, it does not need to
reflect real branch information. All Create, Update, and Delete actions
in this demo do work and will change `db.json` (json-server writes changes
back to the file), so the point of this project is to show that the CRUD
functionality works correctly, not to manage real production data. If you
want to reset the data back to its original state at any time, replace
`db.json` with the original copy.

## Environment Variables

The API base URL is configured in `.env`:

```
VITE_API_URL=http://localhost:3001
```

Change this if you run json-server on a different port.

## Notes

- This is a UI/functionality demo only. It does not include the login and
  role-based authentication that exists in the real deployed system, both
  views are shown side by side purely for demonstration purposes.
- Styling is done with Tailwind CSS utility classes, using a custom green
  "brand" color palette to match the original design.
