# Social Media Manager - Frontend

A modern, production-ready Next.js 15 application for managing social media content across multiple platforms (LinkedIn, Instagram, X, Facebook). Built with TypeScript, Tailwind CSS, and a component-driven architecture.

## 🎯 Overview

This frontend application is part of the AI-powered Social Media Management System. It provides:

- **Dashboard**: Overview of pending approvals, published posts, engagement metrics, and analytics
- **Content Editor**: AI-assisted content creation with live platform previews
- **Content Calendar**: Schedule and manage posts across all platforms
- **Analytics**: Real-time performance metrics and insights
- **Settings**: Platform configuration, team management, and content guidelines
- **Responsive Design**: Mobile-first, fully responsive UI
- **Dark Mode Ready**: Built with CSS variables for theme support

## 🏗️ Architecture

```
src/
├── components/         # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Layout.tsx
│   └── index.ts
├── pages/             # Next.js pages
│   ├── index.tsx      # Dashboard
│   ├── editor.tsx     # Content Editor
│   ├── calendar.tsx   # Content Calendar
│   ├── analytics.tsx  # Analytics
│   ├── settings.tsx   # Settings
│   └── _app.tsx       # App wrapper
├── styles/            # Global styles
│   └── globals.css
├── types/             # TypeScript types
│   └── index.ts
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── api/               # API client
└── store/             # State management
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (with npm or yarn)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/social-media-manager-frontend.git
cd social-media-manager-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API endpoint:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development

```bash
# Run linter
npm run lint

# Type checking
npm run type-check

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Primary**: `#1e40af` (Deep Blue)
- **Accent**: `#06b6d4` (Teal)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)

### Components
- `Button` - Primary actions
- `Card` - Content containers
- `Badge` - Status indicators
- `Input`, `TextArea`, `Select` - Form controls
- `Layout` - Page layout with navigation

## 📦 Key Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Recharts**: Data visualization
- **Zustand**: State management
- **React Hook Form**: Form handling
- **Zod**: Data validation

## 🔌 API Integration

The application expects a backend API at `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`).

### Endpoints Used

- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/approve` - Approve post for publishing
- `GET /api/analytics` - Fetch analytics data
- `GET /api/engagement` - Fetch engagement data
- `POST /api/platforms/connect` - Connect social platform
- `GET /api/platforms` - Get connected platforms

### Mock Data

For development without a backend, set `NEXT_PUBLIC_ENABLE_MOCK_DATA=true` in `.env.local`. This uses in-memory mock data.

## 📱 Pages

### Dashboard (`/`)
Main overview page showing:
- Quick stats (pending approvals, published posts, engagement rate, leads)
- Approval queue with platform indicators
- Today's schedule
- Agent status

### Content Editor (`/editor`)
Create and edit posts with:
- Platform selection (LinkedIn, Instagram, X, Facebook)
- Content topic input
- Tone selection
- CTA customization
- Live preview for each platform
- Character count and readability scores
- AI generation button (mock)

### Calendar (`/calendar`)
Schedule and manage posts:
- Month view calendar
- Drag-to-reschedule (mock)
- Today's schedule sidebar
- Monthly statistics

### Analytics (`/analytics`)
Performance tracking:
- KPI cards (reach, engagement, followers)
- Weekly engagement trend
- Platform distribution chart
- Performance table
- Top performing posts

### Settings (`/settings`)
Configuration management:
- Account settings
- Platform connections
- Approval workflow
- Content guidelines
- Security & privacy settings

## 🔐 Security

- Environment variables for sensitive data
- No hardcoded API keys
- CSRF protection ready
- Secure headers configured
- Input validation with Zod

## 📊 State Management

Uses Zustand for global state:
- User authentication
- Notification management
- UI state (sidebar, modals)
- Cache management

See `src/store/` for implementation.

## 🎯 TypeScript

Fully typed application with:
- Global types in `src/types/index.ts`
- Component prop types
- API response types
- Strict mode enabled

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
npm i -g vercel
vercel
```

### Docker

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

Build and run:
```bash
docker build -t social-media-manager-frontend .
docker run -p 3000:3000 social-media-manager-frontend
```

### Other Platforms

- **AWS Amplify**: Push to GitHub, Amplify auto-deploys
- **GitHub Pages**: Static export with `next export`
- **Railway**: Connect GitHub repo
- **Heroku**: Deploy with buildpack

## 🧪 Testing

```bash
# Run tests (coming soon)
npm run test

# Test with coverage
npm run test:coverage
```

## 🐛 Debugging

Enable debug logging:
```typescript
// In any file
console.log('Debug info:', data);
```

Browser DevTools:
- React DevTools extension recommended
- Performance profiling in Lighthouse
- Network tab for API debugging

## 📚 Project Structure Best Practices

- **Components**: Small, reusable, single responsibility
- **Pages**: Use Next.js file-based routing
- **Types**: Centralized in `src/types/`
- **Styles**: Tailwind classes, minimal custom CSS
- **API**: Centralized in `src/api/`
- **State**: Use Zustand for global state only

## 🚀 Performance Optimization

- Image optimization with `next/image`
- Code splitting automatic with Next.js
- CSS optimization with Tailwind PurgeCSS
- Bundle analysis: `npm run build --analyze`

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and commit: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and feature requests, please open an issue on GitHub.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 📅 Roadmap

- [ ] Phase 2: DM Outreach functionality
- [ ] CRM integrations (Salesforce, HubSpot)
- [ ] Advanced sentiment analysis
- [ ] Competitor tracking
- [ ] Content recommendations
- [ ] Email notifications
- [ ] Slack integration
- [ ] Team collaboration features

---

**Built with ❤️ for marketing teams**

Last Updated: January 2024
Frontend Version: 0.1.0
