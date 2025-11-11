## UCLA Club Finder

Monorepo with a Node/Express API (`server`) and a React app powered by Vite (`client`).

### Prerequisites
- Node 20+
- A MongoDB URI (Atlas or local)

### 1) Backend (server)
1. Create env from example and fill values
```
cd server
cp env.example .env
# set:
# PORT=4000
# MONG_URI=your-mongodb-uri
```
2. Install and run
```
npm install
npm run dev
```
3. Expected log: `connected to db and listening on port 4000`.

Quick test
```
curl http://localhost:4000/api/clubs
```

Troubleshooting
- EADDRINUSE: change `PORT` in `server/.env` (e.g., 5000) or free the port with `lsof -i :4000`.
- Mongo auth/network: verify Atlas database user/password and IP access list.

### 2) Frontend (client)
1. Install and run dev server
```
cd ../client
npm install
npm run dev
```
2. App runs at `http://localhost:5173`.

Notes
- We migrated from CRA to Vite. Entry is `client/src/main.jsx`; HTML is `client/index.html`.
- MUI v5 is in use. Prefer imports from `@mui/material` and `@mui/icons-material`.

### 3) Environment and security
- Secrets live in `server/.env` (ignored by git). Never commit real credentials.
- If a secret was ever pushed, rotate it and scrub repo history.

### 4) Project scripts
Server
```
cd server
npm run dev           # start API with nodemon
```
Client
```
cd client
npm run dev           # start Vite dev server
npm run build         # production build
npm run preview       # preview production build
```

### 5) Current data sources
- Home cards are currently rendered from static arrays in `client/src/components/CardGrid.jsx`.
- Saved Clubs page uses placeholder slides; no real data is fetched yet.

