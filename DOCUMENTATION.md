# Paris Group Legal AI - System Documentation

## Overview

The Paris Group Legal AI is a comprehensive web-based legal consultant system designed exclusively for Paris Group Dubai's Legal Department. It specializes in rental disputes and real estate transactions, providing expert guidance based on UAE/Dubai law with bilingual support (English and Arabic).

## Key Features

### 1. Legal Consultations
- **AI-Powered Chat Interface**: Interactive consultation sessions with context-aware legal guidance
- **Bilingual Support**: Full support for English and Arabic languages
- **Consultation Categories**:
  - Rental Disputes
  - Real Estate Transactions
  - Contract Review
  - General Inquiries
- **Consultation Management**: Track active, completed, and archived consultations

### 2. Document Management
- **Secure Upload**: Upload contracts, leases, agreements, and legal documents
- **S3 Storage**: All documents stored securely in cloud storage
- **Document Types**: Support for PDF, Word, and text documents
- **Document Tracking**: View all documents associated with consultations

### 3. Contract Review Engine
- **Clause-by-Clause Analysis**: Comprehensive legal review of contracts
- **Risk Assessment**: Overall risk scoring (0-100) with detailed breakdown
- **Problematic Clause Detection**: Identifies clauses that may pose legal risks
- **Missing Clause Identification**: Highlights important missing provisions
- **Legal Recommendations**: Actionable suggestions for contract improvements
- **Legal References**: Exact citations to UAE/Dubai laws and articles

### 4. Report Generation
- **Formal Legal Reports**: Professional reports in Markdown format
- **Report Types**:
  - Consultation Summary
  - Contract Review
  - Legal Analysis
  - Advisory Memo
- **Bilingual Reports**: Generate reports in English or Arabic
- **Report History**: Access all previously generated reports

### 5. Legal Knowledge Base
The system integrates comprehensive UAE/Dubai legal framework:

#### Dubai Rental Law
- **Law 26/2007**: Regulation of Landlord-Tenant Relationships
- **Law 33/2008**: Amendments to rental law
- **Key Provisions**:
  - Rent increase limitations (2-year minimum)
  - Eviction procedures and grounds
  - Security deposit regulations
  - Maintenance obligations
  - Notice period requirements (90 days for renewal, 12 months for personal use)

#### RERA Regulations
- Real Estate Regulatory Agency oversight
- Escrow account requirements for developers
- 180-day rule for project commencement
- Strata law compliance

#### Real Estate Transactions
- Oqood registration for off-plan properties
- Dubai Land Department procedures
- Property transfer requirements
- Escrow procedures

#### UAE Civil Code
- Federal Law 5/1985
- Contract formation requirements
- Property rights framework

## System Architecture

### Database Schema

**Users Table**
- User authentication and role management
- Admin and user roles for access control

**Consultations Table**
- Consultation tracking and categorization
- Status management (active, completed, archived)
- Language preference storage

**Messages Table**
- Chat message history
- Role-based messages (user, assistant, system)

**Documents Table**
- Document metadata and storage references
- File type and size tracking
- S3 URL storage

**Contract Reviews Table**
- Risk scores and analysis results
- Findings, recommendations, and legal references
- JSON-formatted detailed analysis

**Reports Table**
- Generated report storage
- Report type and language tracking
- Markdown content storage

**Legal Knowledge Table**
- UAE/Dubai law articles and provisions
- Bilingual legal content
- Searchable keyword indexing

### Backend API (tRPC)

**Consultations Router**
- `create`: Create new consultation
- `list`: Get user's consultations
- `getById`: Retrieve consultation details
- `updateStatus`: Change consultation status

**Messages Router**
- `list`: Get consultation messages
- `send`: Send message and get AI response

**Documents Router**
- `upload`: Upload document to S3
- `list`: Get consultation documents
- `getById`: Retrieve document details

**Contract Review Router**
- `analyze`: Perform contract analysis
- `getByDocumentId`: Get review results
- `list`: Get all reviews for consultation

**Reports Router**
- `generate`: Create formal legal report
- `list`: Get consultation reports
- `getById`: Retrieve report content

**Legal Knowledge Router**
- `search`: Search legal knowledge base

### Frontend Pages

**Home (`/`)**
- Landing page with service overview
- Legal framework coverage
- Authentication gateway

**Dashboard (`/dashboard`)**
- Consultation overview and statistics
- Recent consultations list
- Quick access to create new consultation

**New Consultation (`/new-consultation`)**
- Consultation creation form
- Category and language selection
- Service information

**Consultation (`/consultation/:id`)**
- Chat interface with AI assistant
- Document upload tab
- Real-time message streaming

**Contract Review (`/contract-review/:documentId`)**
- Risk assessment dashboard
- Findings and recommendations
- Problematic and missing clauses
- Legal references

**Reports (`/reports/:consultationId`)**
- Report generation interface
- Report list and preview
- Markdown rendering

## Legal Guidance Approach

The system follows a **70% informational, 30% advisory** approach:

### Informational (70%)
- Provide exact legal provisions and article numbers
- Explain relevant UAE/Dubai laws
- Present factual legal context
- Define legal terminology

### Advisory (30%)
- Suggest options and potential next steps
- Identify risks and opportunities
- Recommend contract improvements
- Provide strategic guidance

### Legal Disclaimers
All advisory recommendations include disclaimers stating that the AI is not a substitute for a licensed lawyer but provides guidance based on current UAE/Dubai law and Paris Group internal documents.

## Usage Guidelines

### Starting a Consultation
1. Sign in with authorized credentials
2. Navigate to Dashboard
3. Click "New Consultation"
4. Enter title, select category and language
5. Begin chatting with the AI assistant

### Uploading Documents
1. Open a consultation
2. Navigate to "Documents" tab
3. Click "Upload Document"
4. Select PDF, Word, or text file
5. Document is automatically stored in S3

### Reviewing Contracts
1. Upload contract document
2. Click "Analyze Contract" from document view
3. Review risk score and findings
4. Read recommendations and legal references
5. Use insights for contract negotiation

### Generating Reports
1. Open consultation
2. Navigate to Reports section
3. Click "Generate Report"
4. Enter title and select report type
5. View generated report in Markdown format

## Security and Access Control

### Restricted Access
- System is restricted to Paris Group Legal Department only
- Authentication required for all features
- Role-based access control (admin/user)

### Data Protection
- All documents stored securely in S3
- Confidential handling of legal matters
- Compliance with internal data protection policies

### Session Management
- Secure cookie-based authentication
- Automatic session expiration
- Protected API endpoints

## Technical Stack

### Frontend
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- tRPC for type-safe API calls
- Wouter for routing
- Shadcn/ui component library
- Streamdown for Markdown rendering

### Backend
- Node.js with Express
- tRPC 11 for API layer
- Drizzle ORM for database
- MySQL/TiDB database
- LLM integration for AI responses
- S3 for file storage

### AI Integration
- Manus LLM API for legal analysis
- Structured JSON responses for contract review
- Context-aware legal guidance
- Bilingual prompt engineering

## Maintenance and Updates

### Adding Legal Knowledge
1. Edit `server/legalKnowledgeBase.ts`
2. Add new `LegalArticle` entries
3. Include English and Arabic content
4. Add relevant keywords for search
5. Restart server to apply changes

### Updating Legal Prompts
1. Modify system prompts in `server/routers.ts`
2. Update legal context building logic
3. Test with sample consultations
4. Verify legal accuracy

### Database Migrations
1. Update schema in `drizzle/schema.ts`
2. Run `pnpm db:push` to apply changes
3. Update database helper functions in `server/db.ts`
4. Update tRPC procedures as needed

## Testing

### Unit Tests
- Vitest for backend testing
- Tests located in `server/*.test.ts`
- Run tests with `pnpm test`

### Test Coverage
- Consultation creation
- User authentication
- API endpoint validation

## Deployment

The system is deployed on Manus hosting platform with:
- Automatic SSL certificates
- Custom domain support
- Built-in database hosting
- S3 storage integration
- Environment variable management

## Support and Feedback

For technical support, feature requests, or bug reports, contact the development team or submit feedback through the Manus platform.

## Legal Disclaimer

This AI-powered system provides legal information and guidance based on current UAE/Dubai law and Paris Group internal documents. It is not a substitute for professional legal counsel from a licensed attorney. For binding legal advice, consult with qualified legal professionals.

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Developed for**: Paris Group Dubai Legal Department
