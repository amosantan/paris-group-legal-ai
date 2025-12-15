# GitHub Secrets Configuration Guide

This document lists all the secrets and environment variables that need to be configured in GitHub for the CI/CD pipelines to work properly.

## Required Secrets

### Repository Secrets

Navigate to: **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Example Value | Required For |
|-------------|-------------|---------------|--------------|
| `GITHUB_TOKEN` | Automatically provided by GitHub | N/A (auto-generated) | All workflows |

### Optional Secrets (for Production Deployment)

| Secret Name | Description | Example Value | Required For |
|-------------|-------------|---------------|--------------|
| `DATABASE_URL` | MySQL database connection string | `mysql://user:pass@host:3306/db` | Deployment |
| `GEMINI_API_KEY` | Google Gemini API key for embeddings | `AIza...` | Deployment |
| `OAUTH_SERVER_URL` | OAuth server URL for authentication | `https://oauth.manus.im` | Deployment |
| `OAUTH_CLIENT_ID` | OAuth client ID | `app_...` | Deployment |
| `OAUTH_CLIENT_SECRET` | OAuth client secret | `secret_...` | Deployment |
| `JWT_SECRET` | JWT secret for session tokens | Random 32+ char string | Deployment |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 storage | `AKIA...` | Deployment |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 storage | `secret...` | Deployment |
| `AWS_S3_BUCKET` | S3 bucket name for file storage | `paris-legal-docs` | Deployment |

## Environment Variables

### Repository Variables

Navigate to: **Settings → Secrets and variables → Actions → Variables**

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port | `3000` |
| `ENABLE_RERANKING` | Enable AI re-ranking | `true` |
| `ENABLE_ARABIC_NLP` | Enable Arabic NLP | `true` |

## How to Add Secrets

### Via GitHub Web Interface

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**
5. Enter the secret name and value
6. Click **Add secret**

### Via GitHub CLI

```bash
# Set a secret using GitHub CLI
gh secret set SECRET_NAME --body "secret_value"

# Set a secret from a file
gh secret set SECRET_NAME < secret_file.txt

# List all secrets
gh secret list
```

## Security Best Practices

### ✅ Do's

- **Use strong, random values** for secrets (32+ characters)
- **Rotate secrets regularly** (every 90 days recommended)
- **Use different secrets** for staging and production
- **Never commit secrets** to the repository
- **Use environment-specific secrets** when needed
- **Enable secret scanning** on GitHub
- **Review secret access logs** regularly

### ❌ Don'ts

- **Never hardcode secrets** in code or config files
- **Never share secrets** via email or chat
- **Never use production secrets** in development
- **Never log secrets** in application logs
- **Never commit .env files** with real secrets
- **Never use weak or predictable** secret values

## Environments

GitHub Actions supports multiple environments with different secrets:

### Production Environment

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name it `production`
4. Add environment-specific secrets
5. Configure protection rules (optional)

### Staging Environment

1. Create another environment named `staging`
2. Add staging-specific secrets
3. Use for testing before production deployment

## Verifying Secrets

After adding secrets, you can verify they're working:

1. Go to **Actions** tab
2. Run a workflow manually
3. Check the workflow logs
4. Secrets will show as `***` in logs (masked)

## Troubleshooting

### Secret Not Found

**Problem:** Workflow fails with "secret not found" error

**Solution:**
1. Check secret name spelling (case-sensitive)
2. Verify secret is added to correct repository
3. Ensure workflow has permission to access secrets

### Secret Value Incorrect

**Problem:** Workflow fails with authentication errors

**Solution:**
1. Verify secret value is correct
2. Check for extra spaces or newlines
3. Regenerate the secret if needed
4. Update the secret in GitHub

### Permission Denied

**Problem:** Workflow can't access secrets

**Solution:**
1. Check repository permissions
2. Verify workflow file syntax
3. Ensure GITHUB_TOKEN has correct permissions

## Rotating Secrets

To rotate a secret:

1. Generate new secret value
2. Update in production system first
3. Update in GitHub secrets
4. Verify workflows still work
5. Revoke old secret value

## Secret Naming Convention

Follow these naming conventions for consistency:

- **API Keys:** `{SERVICE}_API_KEY` (e.g., `GEMINI_API_KEY`)
- **Credentials:** `{SERVICE}_{TYPE}` (e.g., `DATABASE_URL`)
- **Tokens:** `{SERVICE}_TOKEN` (e.g., `GITHUB_TOKEN`)
- **Secrets:** `{PURPOSE}_SECRET` (e.g., `JWT_SECRET`)

## Required Secrets Summary

### Minimum for CI/CD

✅ **GITHUB_TOKEN** (auto-provided)

### For Full Deployment

✅ **DATABASE_URL**  
✅ **GEMINI_API_KEY**  
✅ **OAUTH_SERVER_URL**  
✅ **OAUTH_CLIENT_ID**  
✅ **OAUTH_CLIENT_SECRET**  
✅ **JWT_SECRET**  
✅ **AWS_ACCESS_KEY_ID**  
✅ **AWS_SECRET_ACCESS_KEY**  
✅ **AWS_S3_BUCKET**  

## Next Steps

1. ✅ Add required secrets to GitHub
2. ✅ Configure environment variables
3. ✅ Test workflows manually
4. ✅ Enable branch protection rules
5. ✅ Set up deployment environments
6. ✅ Configure notifications

---

**Note:** This configuration is for the Paris Group Legal AI project. Adjust secret names and values according to your specific deployment requirements.
