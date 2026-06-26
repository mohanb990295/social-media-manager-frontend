# ⚡ Quick Start Guide

Get your Social Media Manager frontend running in 5 minutes!

## 🎯 Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account

## 🚀 5-Minute Setup

### 1. Clone the repository (or extract the code)

```bash
cd social-media-manager-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env.local
```

### 4. Start development server

```bash
npm run dev
```

### 5. Open in browser

Go to [http://localhost:3000](http://localhost:3000)

## 🎨 What You'll See

| Page | URL | Features |
|------|-----|----------|
| **Dashboard** | / | Overview, approval queue, schedule |
| **Editor** | /editor | AI content creation, platform preview |
| **Calendar** | /calendar | Schedule posts, month view |
| **Analytics** | /analytics | Performance metrics, trends |
| **Settings** | /settings | Platform setup, preferences |

## 🔨 Available Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Building
npm run build        # Production build
npm start            # Run production build

# Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Debugging
npm run dev -- --port 3001  # Run on different port
```

## 📦 What's Included

✅ **Complete UI Components**
- Button, Card, Badge, Input, TextArea, Select
- Layout with responsive sidebar
- Pre-styled with Tailwind CSS

✅ **5 Full Pages**
- Dashboard with stats and approval queue
- Content Editor with live preview
- Calendar for scheduling
- Analytics with charts
- Settings for configuration

✅ **TypeScript**
- Fully typed interfaces
- Type-safe components
- Strict mode enabled

✅ **Responsive Design**
- Mobile-first approach
- Tailwind breakpoints
- Touch-friendly controls

✅ **Production Ready**
- ESLint configured
- Prettier formatting
- Environment variables
- Error boundaries

## 🔌 Backend Integration

By default, the app uses **mock data**. To connect to a real backend:

1. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_ENABLE_MOCK_DATA=false
```

2. Implement API client in `src/api/client.ts`

3. Replace mock data with real API calls

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Add New Pages
1. Create file in `src/pages/mypage.tsx`
2. Add to navigation in `src/components/Layout.tsx`
3. Create components as needed

### Connect Platform
1. Update Settings page with real OAuth
2. Add platform API client
3. Implement publishing flow

## 📚 Next Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to vercel.com
   - Connect GitHub repository
   - Set environment variables
   - Click Deploy

3. **Connect Backend**
   - Update API URL in .env
   - Implement API client
   - Replace mock data

4. **Add Features**
   - Team collaboration
   - CRM integrations
   - Lead detection
   - DM automation

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- --port 3001
```

### Module not found errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
npm run type-check
```

### Styling issues?
```bash
# Rebuild Tailwind cache
rm -rf .next
npm run dev
```

## 📚 Documentation

- **Full README**: See README.md
- **GitHub Setup**: See GITHUB_SETUP.md
- **Design System**: Colors and components in src/styles/globals.css
- **Types**: Interfaces defined in src/types/index.ts

## 🌐 Project Links

- **Component Demo**: [http://localhost:3000](http://localhost:3000)
- **Next.js Docs**: [nextjs.org](https://nextjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React Docs**: [react.dev](https://react.dev)

## 💡 Pro Tips

1. Use React DevTools for debugging
2. Check Network tab for API calls
3. Use `console.log` for quick debugging
4. Read TypeScript errors carefully
5. Restart dev server after `.env` changes

## 🎉 Ready to Go!

Your frontend is now running and ready to connect to the backend. Start building! 🚀

---

**Need help?**
- Check README.md for detailed documentation
- See GITHUB_SETUP.md for deployment instructions
- Open an issue on GitHub
