# Supabase Setup Guide

Complete guide to setting up your Supabase backend for the African Time Tracker.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create an account
4. Click "New Project"
5. Fill in:
   - **Name**: african-time-tracker (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier works great for solo use
6. Click "Create new project"
7. Wait ~2 minutes for project to initialize

## Step 2: Create the Database Table

1. In your Supabase project dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create time_logs table
CREATE TABLE time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  project TEXT NOT NULL,
  task_type TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_log_date ON time_logs(log_date DESC);

-- Add comment to table
COMMENT ON TABLE time_logs IS 'Stores time tracking logs for advisory/board work';
```

4. Click **Run** (or press Ctrl/Cmd + Enter)
5. You should see "Success. No rows returned"

## Step 3: Disable Row Level Security (MVP Only)

⚠️ **Important**: This disables authentication for MVP. We'll add proper auth in v2.

1. In the left sidebar, click **Authentication** → **Policies**
2. Find the `time_logs` table
3. Click the **RLS** toggle to **OFF** (it should turn gray)
4. Confirm the warning

**Note**: This means anyone with your API keys can read/write data. Only share your app URL with trusted users for now.

## Step 4: Get API Credentials

1. In the left sidebar, click **Settings** (gear icon at bottom)
2. Click **API** in the settings menu
3. You'll see two important values:

### Project URL
- Copy the URL under "Project URL"
- Example: `https://abcdefghijklmnop.supabase.co`

### Anon/Public Key
- Under "Project API keys", copy the **anon** key (the **public** one)
- It's a long string starting with "eyJ..."
- **DO NOT** copy the `service_role` key (keep that secret!)

## Step 5: Add Credentials to Your App

1. In your project, create `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and paste your credentials:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

## Step 6: Test the Connection

1. Start your dev server:
```bash
npm run dev
```

2. Open the app in your browser
3. Try creating a time log entry
4. Go back to Supabase → **Table Editor** → `time_logs`
5. You should see your entry!

## Troubleshooting

### "Failed to fetch" error
- Check that your `.env.local` file is in the project root
- Verify the Supabase URL is correct (no trailing slash)
- Make sure you copied the full anon key

### "Row Level Security" error
- Confirm RLS is disabled for `time_logs` table
- Check Authentication → Policies in Supabase dashboard

### Data not showing up
- Refresh the Table Editor in Supabase
- Check browser console for errors
- Verify the table was created successfully

### "Cannot insert" error
- Make sure the table schema matches exactly
- Check that hours value is between 0.25 and 24
- Verify project and task_type match the constants

## Next Steps (Future Versions)

For production use, you'll want to:

1. **Enable RLS** and create policies
2. **Add authentication** (email/password or OAuth)
3. **Set up user-specific data access**
4. **Enable database backups** (automatic in paid tiers)
5. **Set up monitoring** and alerts

## Supabase Free Tier Limits

The free tier includes:
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth/month
- 50,000 monthly active users

For solo use tracking time logs, you'll likely use < 1% of these limits.

## Database Schema Reference

### time_logs table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Auto-generated unique ID |
| log_date | DATE | NOT NULL | Date of work (YYYY-MM-DD) |
| hours | DECIMAL(4,2) | NOT NULL, 0.01-24 | Hours worked |
| project | TEXT | NOT NULL | Company name |
| task_type | TEXT | NOT NULL | Type of work |
| notes | TEXT | NULL | Optional notes |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Project issues: [GitHub Issues](your-repo-url/issues)
