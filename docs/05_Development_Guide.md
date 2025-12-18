# SANZEN Legal AI: Development Guide

**Author**: Manus AI
**Date**: December 18, 2025

## 1. Introduction

This document provides a guide for developers who want to contribute to the SANZEN Legal AI platform. It covers the development setup, configuration, and deployment process.

## 2. Development Setup

To set up the development environment, you will need to have Node.js and pnpm installed on your machine. Then, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amosantan/paris-group-legal-ai.git
   cd paris-group-legal-ai
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:
   ```
   DATABASE_URL="your_supabase_database_url"
   GEMINI_API_KEY="your_gemini_api_key"
   LLM_PROVIDER="gemini"
   JWT_SECRET="your_jwt_secret"
   ```

4. **Run the development server**:
   ```bash
   pnpm run dev
   ```

This will start the backend server on `http://localhost:3000` and the frontend development server on `http://localhost:5173`.

## 3. API Documentation

The backend API is built with tRPC, which provides type-safe API calls without the need for a separate API specification. The available procedures are defined in `server/routers.ts`. You can explore the available procedures and their input/output types directly in the code.
