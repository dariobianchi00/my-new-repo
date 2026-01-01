# African Time Tracker - Architecture Explained

A simple guide to understanding how Supabase and Vercel work together to power your app.

---

## The Big Picture

Your African Time Tracker is split into two main parts:

1. **Frontend** (the user interface) - hosted on **Vercel**
2. **Backend** (the database) - hosted on **Supabase**

They talk to each other over the internet, which means you can update either one independently.

---

## What is Supabase?

**Supabase = Database + API in one package**

Think of Supabase as a smart filing cabinet that:
- Stores all your time log entries in a **PostgreSQL database**
- Provides an **automatic API** (a way for your app to talk to the database)
- Handles the heavy lifting of database management for you

### What We Did with Supabase:

1. **Created a database table** called `time_logs` with these fields:
   - `id` - A unique identifier for each entry
   - `log_date` - The date you worked
   - `hours` - How many hours you worked
   - `project` - Which company (Daakye Digital, Affinity, etc.)
   - `task_type` - What kind of work (Strategy calls, Email/admin, etc.)
   - `notes` - Optional notes about the work
   - `created_at` - When the entry was created

2. **Disabled Row Level Security (RLS)** - This is normally a security feature that controls who can see what data. We turned it off for MVP because:
   - We don't have user authentication yet (no login system)
   - You're the only user
   - It simplifies development
   - **Important**: We'll add authentication in v2 for multi-user support

3. **Got API credentials**:
   - **Project URL**: The address of your Supabase database
   - **Anon Key**: A public key that lets your app talk to the database
   - These are stored as **environment variables** (secret config that doesn't get committed to Git)

### Why Supabase?

Instead of building your own database server, Supabase gives you:
- ✅ **Instant database** - No server setup needed
- ✅ **Automatic API** - No need to write backend code
- ✅ **Real-time features** - Can add live updates later
- ✅ **Free tier** - Generous limits for solo projects
- ✅ **PostgreSQL** - Industry-standard, powerful database
- ✅ **Built-in features** - Authentication, file storage ready when you need them

---

## What is Vercel?

**Vercel = Web hosting optimized for modern frontend apps**

Think of Vercel as a smart web server that:
- Hosts your React app's HTML, CSS, and JavaScript
- Automatically rebuilds your app when you push to GitHub
- Serves your app from a global network of servers (CDN)
- Gives you a free HTTPS domain

### What We Did with Vercel:

1. **Connected to GitHub** - Vercel watches your repository for changes

2. **Configured build settings**:
   - **Framework**: Vite (detected automatically)
   - **Build Command**: `npm run build` (compiles TypeScript, bundles JavaScript, processes CSS)
   - **Output Directory**: `dist` (where the compiled files go)
   - **Branch**: `claude/african-time-tracker-LsgvP` (which Git branch to deploy)

3. **Added environment variables**:
   - `VITE_SUPABASE_URL` - So your app knows where to find the database
   - `VITE_SUPABASE_ANON_KEY` - So your app can authenticate with Supabase
   - These variables are **injected during build time** into your JavaScript code

4. **Deployed the app** - Vercel:
   - Pulled your code from GitHub
   - Ran `npm install` to get dependencies
   - Ran `npm run build` to compile everything
   - Uploaded the compiled files to their CDN
   - Gave you a live URL: `https://my-new-repo-sooty.vercel.app`

### Why Vercel?

Instead of managing your own web server, Vercel gives you:
- ✅ **Zero configuration** - Detects Vite and sets everything up
- ✅ **Automatic deployments** - Push to Git → automatic deploy
- ✅ **Global CDN** - Fast loading from anywhere in the world
- ✅ **HTTPS by default** - Secure connections out of the box
- ✅ **Preview deployments** - Every branch gets its own test URL
- ✅ **Free tier** - Generous for personal projects
- ✅ **Instant rollbacks** - Can undo deployments with one click

---

## How They Work Together

### The Data Flow:

```
You (Browser)
    ↓
    ↓ 1. Visit https://my-new-repo-sooty.vercel.app
    ↓
Vercel CDN
    ↓ 2. Sends you the HTML, CSS, JavaScript
    ↓
Your Browser
    ↓ 3. JavaScript runs and makes API calls
    ↓
Supabase API
    ↓ 4. Queries the PostgreSQL database
    ↓
Supabase Database
    ↓ 5. Returns your time logs
    ↓
Your Browser
    ↓ 6. Displays the data
```

### Example: Adding a Time Log Entry

1. **You fill out the form** and click Submit
2. **Your browser** (running the React app from Vercel) sends a request to Supabase:
   ```
   POST https://kxxzdjzdonutenvwakfs.supabase.co/rest/v1/time_logs
   {
     "log_date": "2026-01-01",
     "hours": 2.5,
     "project": "Daakye Digital",
     "task_type": "Strategy calls",
     "notes": "Q1 planning discussion"
   }
   ```
3. **Supabase** validates the data and inserts it into the database
4. **Supabase** sends back the created entry with an `id`
5. **Your React app** adds the new entry to the list on screen
6. **Done!** No page reload needed

---

## Key Concepts Explained

### Environment Variables

**What they are**: Secret configuration values that your app needs but shouldn't be in your code.

**Why we use them**:
- ✅ Security - API keys don't get committed to Git (public GitHub repos)
- ✅ Flexibility - Can use different databases for development vs production
- ✅ Best practice - Separates config from code

**How they work**:
- **Locally** (on your computer): Stored in `.env.local` file (which is in `.gitignore`)
- **On Vercel**: Stored in Vercel's dashboard (encrypted and injected during build)

### Build Process

**What it does**: Converts your source code into optimized files for production.

**Steps**:
1. **TypeScript** → JavaScript (browsers don't understand TypeScript)
2. **React JSX** → JavaScript (browsers don't understand JSX)
3. **Tailwind CSS** → Regular CSS (processes custom classes)
4. **Bundle** → Combines all files into a few optimized files
5. **Minify** → Removes whitespace and shortens code for faster loading

**Result**: A `dist/` folder with:
- `index.html` - Entry point
- `assets/index-[hash].js` - Your app's JavaScript
- `assets/index-[hash].css` - Your app's CSS

### API Keys (Anon vs Service Role)

**Anon Key** (the one we use):
- ✅ Safe to use in frontend code
- ✅ Can be seen by users in browser
- ✅ Limited permissions (controlled by RLS when enabled)
- ✅ Perfect for client-side apps

**Service Role Key** (we didn't use):
- ❌ NEVER use in frontend code
- ❌ Has full admin access to database
- ❌ Only for server-side code
- ❌ Like a master password

---

## The Deployment Workflow

### What Happens When You Push Code:

1. **You edit code** on your computer
2. **You commit changes** to Git: `git commit -m "Added new feature"`
3. **You push to GitHub**: `git push`
4. **GitHub** receives your code
5. **Vercel** detects the push (via webhook)
6. **Vercel starts a build**:
   - Clones your repository
   - Runs `npm install`
   - Injects environment variables
   - Runs `npm run build`
   - Uploads compiled files to CDN
7. **Vercel updates your live site** (usually takes 1-2 minutes)
8. **Users see the new version** automatically (no action needed)

### Branch Strategy:

- **`main` branch**: Could be used for production (but protected, can't push directly)
- **`claude/african-time-tracker-LsgvP` branch**: Our feature branch, currently set as production
- **Future**: Can have `dev` branch for testing, `main` for production

---

## Why This Architecture is Good

### Separation of Concerns:
- **Frontend** (Vercel) handles user interface and interactions
- **Backend** (Supabase) handles data storage and queries
- Each can be updated independently

### Scalability:
- **Vercel's CDN** can handle thousands of users visiting your site
- **Supabase** can handle thousands of database queries per second
- No server management needed

### Developer Experience:
- **Git-based workflow** - Familiar tools
- **Automatic deployments** - No manual steps
- **Preview URLs** - Test before going live
- **Easy rollbacks** - One-click undo

### Cost:
- **Free tiers** are generous for solo projects
- **Paid tiers** are reasonable if you grow
- **No server costs** - No EC2 instances, no DevOps

---

## Common Questions

### Q: Why not build my own backend API?

**A**: You could, but Supabase gives you:
- Instant API with no code
- Built-in authentication when you need it
- Real-time subscriptions
- File storage
- Database backups
- All for free to start

Building this yourself would take weeks and require server management.

### Q: Why not use a different hosting platform?

**A**: Vercel is optimized for frontend frameworks like React/Vite:
- Zero configuration for modern frameworks
- Fastest deployments
- Best developer experience
- Free HTTPS and CDN
- Automatic preview deployments

Alternatives like Netlify are similar. AWS/Azure/GCP are more powerful but much more complex.

### Q: Is my data secure?

**For MVP (current setup)**:
- ✅ HTTPS encrypts data in transit
- ✅ Supabase encrypts data at rest
- ❌ No Row Level Security (RLS is disabled)
- ❌ No authentication (anyone with the URL can access)

**For production (future v2)**:
- ✅ Will add user authentication
- ✅ Will enable RLS to restrict data access
- ✅ Each user will only see their own data

### Q: What if Vercel or Supabase goes down?

**Vercel**:
- 99.99% uptime SLA
- Global CDN means redundancy
- If down, your site is offline but data is safe

**Supabase**:
- 99.9% uptime SLA
- Automatic backups
- Can export your database anytime
- PostgreSQL is industry standard (easy to migrate)

### Q: How much does this cost to run?

**Current usage (solo user)**:
- **Vercel**: FREE (within generous limits)
- **Supabase**: FREE (500MB database, 2GB bandwidth/month)
- **Total**: $0/month

**When you might need to pay**:
- Vercel: $20/month for team features, custom domains
- Supabase: $25/month for more database space, backups, support

---

## Future Improvements

### v1.1 - Enhanced MVP:
- Monthly/custom date range charts
- Task type breakdown charts
- CSV export

### v2.0 - Multi-User:
1. **Add authentication**:
   - Use Supabase Auth (built-in)
   - Email/password or OAuth (Google, GitHub)
2. **Enable Row Level Security**:
   - Users only see their own data
   - Policies enforce access control
3. **Update database schema**:
   - Add `user_id` to `time_logs` table
   - Link logs to authenticated users

### v3.0 - Teams:
- Shared workspaces
- Admin/member roles
- Aggregate team reports

---

## Learning Takeaways

You now understand:
- ✅ **Modern web architecture** (frontend + backend separation)
- ✅ **Database-as-a-Service** (Supabase)
- ✅ **Serverless deployment** (Vercel)
- ✅ **CI/CD pipelines** (Git push → auto deploy)
- ✅ **Environment variables** (config management)
- ✅ **Build processes** (TypeScript → JavaScript)

This stack (React + Supabase + Vercel) is used by thousands of production apps. You've learned a professional, modern workflow that scales from side projects to startups.

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Your Supabase Dashboard**: https://supabase.com/dashboard
- **Your Vercel Dashboard**: https://vercel.com/dashboard
- **Your Live App**: https://my-new-repo-sooty.vercel.app
- **Your GitHub Repo**: https://github.com/dariobianchi00/my-new-repo

---

**Built**: January 2026
**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Supabase + Vercel
**Status**: Production (MVP)
