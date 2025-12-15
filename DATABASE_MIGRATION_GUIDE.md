# Database Migration Guide - Paris Group Legal AI

This guide explains how to set up a permanent database outside of Manus for your Legal AI application.

## Current Database Structure

The application uses **MySQL/TiDB** with Drizzle ORM. The main tables are:

| Table | Purpose |
|-------|---------|
| `users` | User authentication and profiles |
| `consultations` | Legal consultation sessions |
| `messages` | Chat messages within consultations |
| `documents` | Uploaded documents for analysis |
| `contractReviews` | Contract review results |
| `reports` | Generated legal reports |
| `legalKnowledge` | Legal articles with vector embeddings (740+ articles) |
| `analytics` | Usage analytics and query tracking |
| `lawyerReviews` | Lawyer review requests |
| `auditLogs` | System audit trail |

---

## Best Database Options for Production

### Option 1: PlanetScale (Recommended for MySQL)
**Best for:** Serverless MySQL, easy scaling, branching for development

**Pros:**
- MySQL-compatible (works with your existing schema)
- Serverless pricing (pay per use)
- Database branching for safe migrations
- Automatic backups
- Global edge deployment

**Setup:**
1. Create account at https://planetscale.com
2. Create a new database
3. Get connection string from dashboard
4. Update `DATABASE_URL` in your environment

**Pricing:** Free tier available (1 database, 5GB storage)

---

### Option 2: Neon (Recommended for PostgreSQL)
**Best for:** Serverless PostgreSQL with branching

**Note:** Requires schema migration from MySQL to PostgreSQL

**Pros:**
- Serverless with auto-scaling
- Database branching
- Point-in-time recovery
- Generous free tier

**Setup:**
1. Create account at https://neon.tech
2. Create a new project
3. Migrate schema to PostgreSQL syntax
4. Update Drizzle config to use `pg` driver

**Pricing:** Free tier (3GB storage, 1 project)

---

### Option 3: Supabase (Full Backend Solution)
**Best for:** PostgreSQL + Auth + Storage + Realtime

**Pros:**
- PostgreSQL database
- Built-in authentication (could replace Manus OAuth)
- File storage (for PDFs)
- Realtime subscriptions
- REST and GraphQL APIs

**Setup:**
1. Create account at https://supabase.com
2. Create a new project
3. Migrate schema to PostgreSQL
4. Use Supabase client or direct PostgreSQL connection

**Pricing:** Free tier (500MB database, 1GB storage)

---

### Option 4: Railway (Easy Deployment)
**Best for:** Simple MySQL/PostgreSQL hosting with app deployment

**Pros:**
- One-click MySQL or PostgreSQL
- Can host your entire app
- Simple pricing
- GitHub integration

**Setup:**
1. Create account at https://railway.app
2. Add MySQL or PostgreSQL service
3. Connect your GitHub repo
4. Deploy automatically

**Pricing:** $5/month base + usage

---

### Option 5: TiDB Cloud (Current Compatible)
**Best for:** Direct compatibility with current setup

**Pros:**
- 100% MySQL compatible
- Distributed database
- Horizontal scaling
- HTAP (analytics + transactions)

**Setup:**
1. Create account at https://tidbcloud.com
2. Create a Serverless cluster
3. Get connection string
4. Update `DATABASE_URL`

**Pricing:** Free tier (25GB storage)

---

## Migration Steps

### Step 1: Export Current Data

```bash
# Connect to Manus database and export
# (You'll need the DATABASE_URL from Manus)

# Export schema
npx drizzle-kit generate

# Export data (run in your app)
node -e "
const { db } = require('./server/db');
const data = await db.select().from(legalKnowledge);
console.log(JSON.stringify(data));
" > legal_knowledge_backup.json
```

### Step 2: Set Up New Database

1. Choose a provider from above
2. Create the database
3. Get the connection string

### Step 3: Update Environment Variables

```env
# Replace with your new database URL
DATABASE_URL=mysql://user:password@host:port/database?ssl=true
```

### Step 4: Run Migrations

```bash
# Generate migration files
pnpm drizzle-kit generate

# Push schema to new database
pnpm db:push
```

### Step 5: Import Data

```bash
# Import your backed up data
node import-data.mjs
```

---

## Vector Embeddings Storage

Your legal knowledge base uses **vector embeddings** for semantic search. Options:

### Option A: Keep in MySQL (Current)
- Store embeddings as JSON text in `legalKnowledge.embedding` column
- Works but not optimized for vector similarity search

### Option B: Dedicated Vector Database
- **Pinecone** - Managed vector database
- **Weaviate** - Open source, self-hosted option
- **Qdrant** - High-performance vector search
- **Chroma** - Lightweight, easy to use

### Option C: PostgreSQL with pgvector
- Add `pgvector` extension to PostgreSQL
- Native vector similarity search
- Works with Supabase and Neon

---

## Recommended Setup for Production

For your Paris Group Legal AI, I recommend:

1. **Database:** PlanetScale or TiDB Cloud (MySQL compatible, no schema changes)
2. **File Storage:** AWS S3 or Cloudflare R2 (for PDF uploads)
3. **Vector Search:** Keep in MySQL for simplicity, or migrate to Pinecone for scale

---

## Need Help?

If you need assistance with the migration, the key files to review are:
- `drizzle/schema.ts` - Database schema
- `server/db.ts` - Database queries
- `server/vectorEmbeddings.ts` - Embedding generation
- `server/legalKnowledgeBase.ts` - Knowledge base queries

Contact your development team or reach out for professional migration assistance.
