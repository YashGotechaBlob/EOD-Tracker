# EOD Tracker

A web application to track your daily progress by automatically collecting your GitHub commits and organizing them into meaningful end-of-day reports.

## Features

- GitHub OAuth integration
- Automatic commit collection
- Daily EOD report generation
- Summary writing and editing
- Dashboard view of recent reports

## Tech Stack

- Frontend:
  - React + Vite
  - Material UI
  - React Router
  - TypeScript

- Backend:
  - Node.js + Express
  - TypeScript
  - GitHub API integration

## Setup

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/EOD-Tracker.git
cd EOD-Tracker
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with:
```
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
API_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
```

4. Start the development servers:

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

5. Open http://localhost:5173 in your browser

## Development

- Backend runs on http://localhost:3000
- Frontend runs on http://localhost:5173
- API documentation available in the `/server/src/routes` directory

## License

MIT # Project Status
Current Status: MVP Complete
