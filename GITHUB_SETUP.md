# 🚀 GitHub Setup & Deployment Guide

## Step-by-Step: Push to GitHub

### 1. Create GitHub Repository

**Option A: Using GitHub Web Interface**
- Go to [github.com/new](https://github.com/new)
- Repository name: `social-media-manager-frontend`
- Description: "AI-powered social media management frontend"
- Choose Public or Private
- Click "Create repository"
- Copy the repository URL

**Option B: Using GitHub CLI**
```bash
gh repo create social-media-manager-frontend --public --source=. --remote=origin --push
```

### 2. Initialize Git (if not already done)

```bash
cd /home/claude/social-media-manager-frontend

# Initialize git if needed
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Next.js frontend setup with complete UI"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/social-media-manager-frontend.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Verify Push

```bash
git log --oneline
git remote -v
git status
```

## 📁 Project Structure

```
social-media-manager-frontend/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Next.js pages (routing)
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript interfaces
│   ├── lib/                # Utility functions (add as needed)
│   ├── hooks/              # Custom hooks (add as needed)
│   ├── api/                # API client (add as needed)
│   └── store/              # Zustand store (add as needed)
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── next.config.js          # Next.js config
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
└── GITHUB_SETUP.md         # This file
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - $0)

**Easiest & Fastest**

1. Go to [vercel.com](https://vercel.com/new)
2. Click "Import Project"
3. Select "GitHub" and authorize
4. Find your repository and import
5. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_ENABLE_MOCK_DATA`: `true` for development
6. Click "Deploy"

Your app is live in seconds! Automatic deployments on every push to main.

### Option 2: GitHub Pages

**For static export**

1. Modify `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/social-media-manager-frontend',
  trailingSlash: true,
  // ... rest of config
};
```

2. Add GitHub Actions workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

3. Push and enable GitHub Pages in Settings

### Option 3: Railway.app

**Simple & Free Tier**

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Authorize and select repository
4. Add environment variables
5. Deploy!

### Option 4: AWS Amplify

**Scalable Hosting**

1. Go to [AWS Amplify Console](https://us-east-1.console.aws.amazon.com/amplify)
2. "Create App" → Connect GitHub
3. Select repository and branch
4. Configure build settings
5. Deploy!

### Option 5: Docker + AWS ECS/ECR

**For containerized deployment**

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Create `.dockerignore`:
```
node_modules
.next
.git
.gitignore
```

Build and push:
```bash
docker build -t social-media-manager-frontend .
docker tag social-media-manager-frontend:latest your-registry/social-media-manager-frontend:latest
docker push your-registry/social-media-manager-frontend:latest
```

## 📋 GitHub Repository Checklist

- [ ] Repository created
- [ ] Code pushed to main branch
- [ ] README.md updated with your info
- [ ] LICENSE added (MIT recommended)
- [ ] .gitignore in place
- [ ] Environment variables documented
- [ ] Branch protection rules enabled
  - Require pull request reviews
  - Require status checks to pass
  - Dismiss stale pull request approvals
- [ ] Collaborators/team added
- [ ] Deployment configured

## 🔑 GitHub Secrets for CI/CD

Add to repository Settings → Secrets and variables → Actions:

```
NEXT_PUBLIC_API_URL = https://your-api.com
DOCKER_USERNAME = your-docker-username
DOCKER_PASSWORD = your-docker-token
AWS_ACCESS_KEY_ID = your-key
AWS_SECRET_ACCESS_KEY = your-secret
```

## 📝 Recommended .gitignore Additions

The project already includes .gitignore, but make sure to add:

```
# IDE specific
.vscode/settings.json
.idea/

# Environment
.env
.env.local
.env.*.local

# Build
.next/
out/
dist/

# Dependencies
node_modules/
package-lock.json
yarn.lock

# OS
.DS_Store
Thumbs.db
```

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature description"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# After approval, merge to main

# Keep local main updated
git checkout main
git pull origin main
```

## 🚀 Automated Deployments

### GitHub Actions Example

Create `.github/workflows/test-and-deploy.yml`:

```yaml
name: Test & Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🔗 Links

- [GitHub Docs](https://docs.github.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Docker Docs](https://docs.docker.com)

## 🆘 Troubleshooting

### "fatal: not a git repository"
```bash
git init
git remote add origin <your-repo-url>
```

### "Permission denied (publickey)"
```bash
# Generate SSH key if needed
ssh-keygen -t ed25519 -C "your-email@example.com"
# Add public key to GitHub Settings → SSH and GPG keys
```

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin <correct-url>
```

### Large files error
```bash
git filter-repo --invert-paths --path <large-file>
git push -f
```

---

**Questions?** Open an issue on GitHub or check the README.md

Good luck with your deployment! 🎉
