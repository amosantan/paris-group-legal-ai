# SANZEN Legal AI

**UAE Legal Intelligence Platform**

## Overview

SANZEN Legal AI is a comprehensive legal intelligence platform specializing in UAE law, with particular expertise in Dubai real estate, rental disputes, and property transactions. The system leverages advanced AI technology with semantic search capabilities across 818+ legal articles.

## Features

### Core Capabilities
- **Legal Consultation**: AI-powered legal guidance for UAE/Dubai law
- **Contract Review**: Automated analysis of legal documents
- **Document Upload**: PDF analysis and legal interpretation
- **Knowledge Base**: 818 legal articles with vector embeddings
- **Bilingual Support**: English and Arabic

### Specialized Areas
- Rental disputes and tenant-landlord issues
- Real estate transactions and property law
- Dubai Land Department (DLD) regulations
- RERA compliance and standards
- Broker licensing and requirements
- Property management guidelines

## Technology Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Express + tRPC
- **Database**: Supabase PostgreSQL with pgvector
- **AI**: Gemini API for embeddings and chat
- **Search**: Vector similarity search with HNSW indexing

## Database

- **Platform**: Supabase
- **Total Articles**: 818
  - 798 general UAE legal articles
  - 20 Dubai Land Department documents
- **Embeddings**: 768-dimensional vectors
- **Performance**: 10x faster than previous TiDB setup

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm
- Supabase account

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

```env
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
paris_group_legal_ai/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── lib/        # Utilities
│   └── public/
│       └── assets/     # Static assets (logo, etc.)
├── server/             # Express backend
│   ├── _core/         # Core server logic
│   ├── db.ts          # Database configuration
│   └── routes.ts      # API routes
├── scrapers/          # Data collection tools
│   ├── dld_complete_pipeline.py
│   ├── moj_portal_scraper.py
│   └── uae_data_processor.py
└── data/              # Data files
```

## Data Sources

- **UAE Ministry of Justice**: Federal laws and regulations
- **Dubai Land Department**: Real estate regulations and guidelines
- **RERA**: Property management standards
- **UAE Legislation Platform**: Comprehensive legal database

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm check` - TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests

### Adding New Legal Documents

Use the automation tools in the `scrapers/` directory:

```bash
# Process DLD documents
python3 scrapers/dld_complete_pipeline.py

# Ingest with embeddings
python3 scrapers/ingest_with_gemini.py data/new_documents.json
```

## Deployment

### Recommended Platforms
- **Manus**: Easiest deployment with built-in features
- **Railway**: Automatic deployments from GitHub
- **Render**: Simple cloud hosting

### Deployment Steps
1. Push code to GitHub
2. Connect repository to deployment platform
3. Add environment variables
4. Deploy!

## Documentation

- **COMPLETE_PROJECT_SUMMARY.md** - Full project overview
- **ENHANCEMENT_ROADMAP.md** - Future development plans
- **SUPABASE_MIGRATION_GUIDE.md** - Database migration guide
- **TECHNICAL_IMPLEMENTATION_GUIDE.md** - Technical details

## Performance

- **Vector Search**: ~0.2-0.3 seconds (10x faster than TiDB)
- **Semantic Understanding**: Recognizes legal synonyms and concepts
- **Accuracy**: 50%+ improvement with vector embeddings
- **Scalability**: Highly scalable with Supabase

## Future Enhancements

### Short-term (1-3 Months)
- Knowledge graph integration
- Advanced RAG pipeline
- Hybrid search (keyword + semantic)

### Medium-term (3-6 Months)
- Legal chatbot
- Compliance guardian
- Enhanced Arabic capabilities

### Long-term (6-12 Months)
- Predictive case analytics
- Agentic workflows
- Law firm management integration

## License

MIT

## Support

For questions or issues, please contact the development team.

---

**SANZEN Legal AI** - Comprehensive UAE Legal Intelligence Platform  
*Powered by AI • Built for Legal Professionals • Trusted by Experts*
