# SANZEN Legal AI: System Overview and Architecture

**Author**: Manus AI
**Date**: December 18, 2025

## 1. Introduction

The SANZEN Legal AI platform is a sophisticated legal intelligence system designed to assist legal professionals in the UAE with their day-to-day tasks. The platform provides a suite of tools for legal consultation, document generation, and legal research, all powered by advanced AI models. This document provides a high-level overview of the system's architecture, technology stack, and deployment process.

## 2. System Architecture

The system is designed with a modern, full-stack architecture, comprising a React-based frontend, a Node.js backend with tRPC, and a Supabase PostgreSQL database. The architecture is designed to be scalable, maintainable, and secure.


### 2.1. Technology Stack

The platform is built using a modern, robust technology stack, summarized in the table below:

| Category          | Technology                                       |
| ----------------- | ------------------------------------------------ |
| **Frontend**      | React, Vite, TypeScript, Tailwind CSS, Shadcn/ui |
| **Backend**       | Node.js, Express, tRPC, Zod                      |
| **Database**      | Supabase (PostgreSQL)                            |
| **ORM**           | Drizzle ORM                                      |
| **AI/LLM**        | Google Gemini, Manus Built-in LLM                |
| **Deployment**    | Render.com                                       |
| **Authentication**| Local Auth (JWT), Manus OAuth (planned)          |
| **PDF Generation**| `pdfkit`                                         |

### 2.2. High-Level Architecture

The architecture is designed as a monolithic application with a clear separation of concerns between the frontend and backend. The frontend is a single-page application (SPA) built with React, which communicates with the backend via tRPC for type-safe API calls. The backend handles business logic, database interactions, and communication with external services like the LLM providers.


### 2.3. Deployment

The application is deployed on Render.com, a modern cloud platform that provides a seamless deployment experience. The deployment process is fully automated via Git push:

1. **Push to `main` branch**: Any push to the `main` branch on GitHub triggers a new deployment on Render.
2. **Build Process**: Render automatically builds the application using the `pnpm run build` command.
3. **Start Command**: Once the build is complete, Render starts the application using the `pnpm run start` command.

### 2.4. Authentication

The system currently uses a local authentication system for development and testing purposes. This system uses JWTs (JSON Web Tokens) to manage user sessions. The long-term plan is to integrate with Manus OAuth for a more robust and secure authentication solution.

## 3. Key Features

The platform offers a range of features designed to enhance the productivity of legal professionals:

- **Legal Consultation**: An AI-powered chat interface for legal queries.
- **Document Generator**: A tool for generating various legal documents, including Demand Letters, Eviction Notices, NOCs, and LOIs.
- **Legal Translator**: A professional translation tool for legal contracts and documents (Arabic ↔ English).
- **Knowledge Base**: A repository of legal documents and articles.
- **PDF Upload**: A feature for uploading and processing PDF documents.
- **LLM Settings**: A page for configuring the LLM provider (Gemini or Manus).
