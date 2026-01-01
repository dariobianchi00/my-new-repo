# African Time Tracker

A mobile-responsive web app for tracking time spent on advisory/board work across multiple companies. Built with React, TypeScript, Supabase, and Tailwind CSS, featuring an African-inspired aesthetic.

## Features

- **Log Time Entries**: Record hours worked with date, project, task type, and optional notes
- **Weekly Visualization**: Stacked bar chart showing time distribution across 4 weeks
- **Recent Logs**: View, edit, and delete your last 20 time entries
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **African Aesthetic**: Warm color palette with earthy tones and subtle textures

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Supabase (PostgreSQL + REST API)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel (frontend), Supabase (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run this schema:

```sql
CREATE TABLE time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  project TEXT NOT NULL,
  task_type TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_log_date ON time_logs(log_date DESC);
```

3. Go to Settings → API to get your:
   - Project URL
   - Anon/Public Key

4. **Disable Row Level Security** (for MVP):
   - Go to Authentication → Policies
   - For the `time_logs` table, disable RLS (we'll add auth later)

### 2. Local Development Setup

1. Clone this repository:
```bash
git clone <your-repo-url>
cd african-time-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

### 3. Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Deploy!

## Usage

### Logging Time

1. Fill out the form with:
   - **Date**: Select a date (cannot be future)
   - **Hours**: Enter hours worked (0.25 - 24, in 0.25 increments)
   - **Project**: Choose from 6 companies
   - **Task Type**: Select task category
   - **Notes**: Optional context (max 200 chars)

2. Click **Submit** to save

### Viewing Data

- **Weekly Chart**: Shows time distribution for current + 3 previous weeks
- **Recent Logs**: Displays last 20 entries with edit/delete options

### Editing/Deleting

- Click **Edit** on any log to modify inline
- Click **Delete** and confirm to remove an entry

## Projects

- Daakye Digital
- Affinity
- Ratecardly
- Lunga Capital
- mNotify
- medPharma

## Task Types

- Strategy calls
- Email/admin
- Board meeting
- Board prep
- Other calls
- Background work

## Color Palette

- Burnt Orange: `#D4693A` (Daakye Digital)
- Terracotta: `#C95D3F` (Affinity)
- Warm Brown: `#8B5A3C` (Ratecardly)
- Sand: `#E8C4A0` (Lunga Capital)
- Deep Green: `#2D5016` (mNotify)
- Dark Goldenrod: `#B8860B` (medPharma)

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Future Enhancements

- User authentication
- Monthly/custom date range views
- CSV export
- Task type breakdown charts
- Strategic vs admin time percentage
- Company logos
- Bulk operations

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
