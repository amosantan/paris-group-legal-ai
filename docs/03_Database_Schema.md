# SANZEN Legal AI: Database Schema

**Author**: Manus AI
**Date**: December 18, 2025

## 1. Introduction

This document provides a detailed overview of the database schema for the SANZEN Legal AI platform. The database is a PostgreSQL instance hosted on Supabase. The schema is managed using Drizzle ORM, although there are some discrepancies between the Drizzle schema and the actual database schema that need to be addressed.

## 2. Tables

This section describes the main tables in the database and their columns.

### 2.1. `users`

This table stores information about users of the platform.

| Column      | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| `id`        | `INTEGER` | **Primary Key**. Auto-incrementing integer ID.   |
| `openId`    | `TEXT`    | The user's unique string identifier (e.g., "sanzen-admin-001"). |
| `email`     | `TEXT`    | The user's email address.                        |
| `name`      | `TEXT`    | The user's full name.                            |
| `createdAt` | `TIMESTAMPTZ` | The timestamp when the user was created.         |
| `updatedAt` | `TIMESTAMPTZ` | The timestamp when the user was last updated.    |

### 2.2. `consultations`

This table stores information about legal consultations.

| Column      | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| `id`        | `INTEGER` | **Primary Key**. Auto-incrementing integer ID.   |
| `user_id`   | `TEXT`    | **Foreign Key** to `users.openId`. The ID of the user who created the consultation. |
| `title`     | `TEXT`    | The title of the consultation.                   |
| `category`  | `TEXT`    | The category of the consultation (e.g., "Rental Dispute"). |
| `language`  | `TEXT`    | The language of the consultation (e.g., "en"). |
| `status`    | `TEXT`    | The status of the consultation (e.g., "active"). |
| `createdAt` | `TIMESTAMPTZ` | The timestamp when the consultation was created. |
| `updatedAt` | `TIMESTAMPTZ` | The timestamp when the consultation was last updated. |

### 2.3. `messages`

This table stores the messages exchanged during a legal consultation.

| Column           | Type      | Description                                      |
| ---------------- | --------- | ------------------------------------------------ |
| `id`             | `INTEGER` | **Primary Key**. Auto-incrementing integer ID.   |
| `consultation_id`| `INTEGER` | **Foreign Key** to `consultations.id`. The ID of the consultation the message belongs to. |
| `role`           | `TEXT`    | The role of the message sender (e.g., "user", "assistant"). |
| `content`        | `TEXT`    | The content of the message.                      |
| `createdAt`      | `TIMESTAMPTZ` | The timestamp when the message was created.      |

## 3. Relationships

The main relationships between the tables are:

- A `user` can have multiple `consultations`.
- A `consultation` belongs to one `user`.
- A `consultation` can have multiple `messages`.
- A `message` belongs to one `consultation`.

## 4. Drizzle ORM Schema Discrepancy

**Important**: The Drizzle ORM schema defined in `drizzle/schema.ts` is currently configured for MySQL, while the actual database is PostgreSQL. This has caused several issues and needs to be rectified. The long-term solution is to rewrite the Drizzle schema to use the `pgTable` functions from `drizzle-orm/pg-core` and ensure that the schema accurately reflects the PostgreSQL database.
