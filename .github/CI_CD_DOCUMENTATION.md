# CI/CD Pipeline Documentation

**Project:** Paris Group Legal AI  
**Repository:** https://github.com/amosantan/paris-group-legal-ai  
**Date:** December 15, 2025

---

## Overview

This document provides a comprehensive overview of the Continuous Integration and Continuous Deployment (CI/CD) pipeline set up for the Paris Group Legal AI project using GitHub Actions.

The pipeline automates testing, building, deployment, and release management, ensuring code quality, consistency, and rapid delivery of new features.

## Workflows

We have set up six distinct GitHub Actions workflows, each responsible for a specific part of the CI/CD process:

1.  **CI - Build and Test (`ci.yml`)**
2.  **Test Suite (`test.yml`)**
3.  **Code Quality (`code-quality.yml`)**
4.  **CD - Deploy to Production (`deploy.yml`)**
5.  **Release Management (`release.yml`)**
6.  **Auto-Sync (`auto-sync.yml`)**

### 1. CI - Build and Test (`ci.yml`)

**Purpose:** Ensures that all new code is tested and builds successfully before being merged.

**Triggers:**
- On `push` to `main` or `develop` branches
- On `pull_request` to `main` or `develop` branches

**Jobs:**

- **`test`**: 
  - Runs unit tests (`pnpm run test`)
  - Checks TypeScript types (`pnpm run check`)
  - Uploads test results as an artifact

- **`build`**:
  - Installs dependencies
  - Builds the application for production (`pnpm run build`)
  - Uploads the build artifacts (`dist/` directory)

- **`lint`**:
  - Checks code formatting with Prettier (`pnpm run format --check`)

### 2. Test Suite (`test.yml`)

**Purpose:** Runs a comprehensive suite of tests on a regular schedule to ensure ongoing stability.

**Triggers:**
- On `push` or `pull_request` to `main` or `develop`
- Daily at 2 AM UTC (`schedule`)

**Jobs:**

- **`unit-tests`**: Runs unit tests on Node.js 20 and 22.
- **`integration-tests`**: Runs integration tests against a real MySQL database.
- **`type-check`**: Ensures TypeScript code is type-safe.
- **`security-scan`**: Scans for vulnerabilities in dependencies.
- **`test-summary`**: Provides a summary of all test results.

### 3. Code Quality (`code-quality.yml`)

**Purpose:** Enforces code quality standards and provides metrics.

**Triggers:**
- On `push` or `pull_request` to `main` or `develop`

**Jobs:**

- **`format-check`**: Checks code formatting and auto-fixes on the `main` branch.
- **`dependency-check`**: Checks for duplicate and outdated dependencies.
- **`code-metrics`**: Counts lines of code and provides other metrics.

### 4. CD - Deploy to Production (`deploy.yml`)

**Purpose:** Automates deployment to production or staging environments.

**Triggers:**
- On `push` to `main` branch
- On creating a new tag (e.g., `v10.0.0`)
- Manually via `workflow_dispatch`

**Jobs:**

- **`deploy`**:
  - Builds the application
  - Creates a deployment package (`.tar.gz`)
  - Creates a GitHub Release for new tags
  - Notifies deployment status

### 5. Release Management (`release.yml`)

**Purpose:** Automates the process of creating new releases.

**Triggers:**
- On `push` of a new tag (e.g., `v10.0.0`)
- Manually via `workflow_dispatch`

**Jobs:**

- **`create-release`**:
  - Generates a changelog from commit messages
  - Creates a deployment package (`.tar.gz` and `.zip`)
  - Creates a new GitHub Release with the changelog and packages

- **`update-documentation`**:
  - Automatically updates the version number in `README.md`

### 6. Auto-Sync (`auto-sync.yml`)

**Purpose:** Keeps the GitHub repository synchronized with any changes made directly on the production server.

**Triggers:**
- Every 6 hours (`schedule`)
- Manually via `workflow_dispatch`

**Jobs:**

- **`sync`**:
  - Checks for differences between the repository and the server
  - If changes are found, commits and pushes them to the `main` branch

## How to Use the CI/CD Pipeline

### Development Workflow

1.  **Create a new branch** from `develop`:
    ```bash
    git checkout develop
    git pull
    git checkout -b feature/my-new-feature
    ```

2.  **Make your changes** and commit them.

3.  **Push your branch** to GitHub:
    ```bash
    git push origin feature/my-new-feature
    ```

4.  **Create a Pull Request** to merge your branch into `develop`.
    - The `CI` and `Test Suite` workflows will run automatically.
    - Ensure all checks pass before merging.

### Release Workflow

1.  **Merge `develop` into `main`** when ready for a new release.

2.  **Create a new tag** on the `main` branch:
    ```bash
    git checkout main
    git pull
    git tag -a v10.0.0 -m "Release version 10.0.0"
    git push origin v10.0.0
    ```

3.  The `Release Management` and `Deploy to Production` workflows will run automatically, creating a new release and deploying it.

### Manual Deployment

1.  Go to the **Actions** tab in your GitHub repository.
2.  Select the **CD - Deploy to Production** workflow.
3.  Click **Run workflow**.
4.  Choose the environment (`production` or `staging`).
5.  Click **Run workflow**.

## Secrets and Configuration

For the CI/CD pipeline to function correctly, you need to configure secrets in your GitHub repository.

**Navigate to:** Settings → Secrets and variables → Actions

Refer to the `SECRETS.md` file in this directory for a complete list of required secrets and how to configure them.

## Benefits of the CI/CD Pipeline

-   **🚀 Faster Delivery:** Automates the release process, allowing for faster and more frequent deployments.
-   **✅ Improved Quality:** Automated testing ensures that bugs are caught early.
-   **🔒 Enhanced Security:** Vulnerability scanning and secret management improve security.
-   **🔄 Consistent Builds:** Every build is created in a clean, consistent environment.
-   **📝 Better Documentation:** Automatic changelog generation and version updates.
-   **🤝 Seamless Collaboration:** Standardized workflow for all contributors.

## Next Steps

1.  **Configure Secrets:** Add the required secrets to your GitHub repository as described in `SECRETS.md`.
2.  **Protect Branches:** Set up branch protection rules for `main` and `develop` to require status checks to pass before merging.
3.  **Start Developing:** Follow the development workflow to start building new features.

---

This CI/CD pipeline provides a robust foundation for developing, testing, and deploying your Paris Group Legal AI application. For any questions, please refer to the workflow files or open an issue in the repository.
