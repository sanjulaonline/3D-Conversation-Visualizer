# 3D Conversation Visualizer

A modern, responsive Next.js application for visualizing ChatGPT conversations in an interactive 3D space using Three.js.

## Features

- 🎨 **Modern UI**: Responsive design with gradient backgrounds and smooth animations
- 🔍 **3D Visualization**: Interactive Three.js-powered 3D word cloud
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⚡ **Performance Optimized**: Modular architecture with separated components
- 🎮 **Interactive Controls**: Mouse/touch controls for rotation, zoom, and selection
- 📊 **Word Analytics**: Click on words to see detailed statistics

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   └── page.tsx             # Main application page
├── components/
│   ├── Header.tsx           # Responsive header with navigation
│   ├── HowToModal.tsx       # Instructions modal
│   ├── MessageModal.tsx     # Word details modal
│   ├── ThreeVisualization.tsx # Three.js visualization component
│   └── index.ts             # Component exports
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── textAnalysis.ts      # Text processing and analysis functions
│   ├── graphGeneration.ts   # Node and link generation logic
│   └── index.ts             # Utility exports
└── styles/
    └── components.css       # Custom component styles
```

## Key Improvements Made

1. **Modular Architecture**: Split the monolithic component into focused, reusable components
2. **Responsive Design**: Mobile-first approach with breakpoint-specific styling
3. **Modern UI**: Gradient backgrounds, glassmorphism, and smooth animations
4. **Better UX**: Improved loading states, error handling, and user feedback
5. **Performance**: Optimized Three.js rendering and proper cleanup
6. **Accessibility**: Better contrast, focus states, and keyboard navigation
7. **Code Organization**: Clear separation of concerns and maintainable structure

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
