# 3D Conversation Visualizer

A modern, responsive Next.js application for visualizing ChatGPT conversations in an interactive 3D space using Three.js and React Three Fiber.

## 🚀 Features

- 🎨 **Modern Landing Page**: Industrial 3D model (Kamdo) with mouse interaction and POIMANDRES-inspired minimal typography
- 🔍 **3D Visualization**: Interactive Three.js-powered 3D word cloud with Real-time rendering
- 📱 **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- ⚡ **Modular Architecture**: Clean component separation for maintainability and scalability
- 🎮 **Interactive Controls**: Mouse/touch controls for rotation, zoom, and word selection
- 📊 **Word Analytics**: Click on words to see detailed conversation statistics
- 🎭 **Drag & Drop Upload**: Intuitive file upload with visual feedback
- 🌐 **Social Media Integration**: Connected social presence throughout the experience
- 🎯 **Auto-Analysis**: Automatic conversation processing after file upload
- 🎪 **Loading States**: Elegant loading overlays with progress indicators
- 🔧 **Error Handling**: Comprehensive error management with user-friendly messages

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── page.tsx                 # Main application orchestrator
│   └── landing.tsx              # Landing page wrapper
├── components/
│   ├── LandingHero.tsx          # 3D landing page with Kamdo model
│   ├── Header.tsx               # Responsive header with navigation
│   ├── FileUploadScreen.tsx     # Drag-and-drop file upload interface
│   ├── VisualizerScreen.tsx     # Complete visualization container
│   ├── ThreeVisualization.tsx   # Three.js 3D word cloud
│   ├── BackButton.tsx           # Navigation back button
│   ├── InstructionsPanel.tsx    # User interaction guidance
│   ├── LoadingOverlay.tsx       # Analysis progress overlay
│   ├── ErrorMessage.tsx         # Error display component
│   ├── HowToModal.tsx          # ChatGPT data export instructions
│   ├── MessageModal.tsx        # Word statistics modal
│   └── index.ts                # Component exports
├── types/
│   └── index.ts                # TypeScript type definitions
├── utils/
│   ├── textAnalysis.ts         # Text processing and analysis
│   ├── graphGeneration.ts      # 3D node and link generation
│   └── index.ts               # Utility exports
├── styles/
│   └── components.css         # Custom component styles
└── public/
    └── models/
        └── kamdo.glb          # Industrial 3D model for landing
```

## 🎯 Key Improvements Made

### **Architecture & Code Quality**
1. **Modular Component Architecture**: Split monolithic code into focused, reusable components
2. **TypeScript Integration**: Full type safety with comprehensive interfaces
3. **Clean Separation of Concerns**: Logic, UI, and state management properly separated
4. **Performance Optimization**: Lazy loading, memoization, and efficient rendering

### **User Experience & Design**
5. **Modern Industrial Landing**: 3D Kamdo model with mouse interaction and minimal typography
6. **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
7. **Glassmorphism UI**: Modern blur effects and transparent overlays
8. **Smooth Animations**: Transition effects and hover states throughout
9. **Drag & Drop Interface**: Intuitive file upload with visual feedback
10. **Auto-Processing**: Automatic analysis after successful file upload

### **3D Visualization & Interaction**
11. **Enhanced Three.js**: React Three Fiber integration with @react-three/drei
12. **Post-Processing Effects**: Bloom and tone mapping for visual polish
13. **Interactive Controls**: OrbitControls with mouse and touch support
14. **Word Analytics**: Detailed statistics on word click interactions
15. **Auto-Rotation**: Optional automatic scene rotation

### **Social & Connectivity**
16. **Social Media Integration**: GitHub, LinkedIn, Twitter, Instagram links
17. **Contact Integration**: Direct email contact availability
18. **Professional Branding**: Consistent social presence across all screens

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.5.2 with App Router and Turbopack
- **3D Graphics**: Three.js with React Three Fiber ecosystem
  - `@react-three/fiber` - React renderer for Three.js
  - `@react-three/drei` - Useful helpers (Stage, Grid, OrbitControls, Environment)
  - `@react-three/postprocessing` - Post-processing effects (Bloom, ToneMapping)
- **Animation**: Maath easing functions for smooth interactions
- **Styling**: Tailwind CSS with custom component styles
- **Language**: TypeScript for type safety
- **3D Models**: GLTF format with Suspense loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sanjulaonline/3D-Conversation-Visualizer.git
cd 3D-Conversation-Visualizer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Getting Your ChatGPT Data

1. Go to [ChatGPT Settings](https://chat.openai.com) → Data Controls
2. Click "Export data"
3. Wait for email with download link
4. Extract and upload the `conversations.json` file

## 🎮 Usage

1. **Landing Experience**: Interact with the 3D Kamdo model by moving your mouse
2. **Get Started**: Click "START VISUALIZATION" to begin
3. **Upload Data**: Drag and drop your ChatGPT `conversations.json` file
4. **Explore**: Navigate the 3D word cloud, click words for statistics
5. **Controls**: Use mouse to rotate, scroll to zoom, toggle auto-rotation

## 📱 Responsive Design

- **Mobile**: Optimized touch controls and compact UI
- **Tablet**: Balanced layout with touch-friendly interactions  
- **Desktop**: Full feature set with mouse controls and larger displays
- **Fullscreen**: Immersive visualization mode

## 🤝 Connect

- **GitHub**: [@sanjulaonline](https://github.com/sanjulaonline)
- **LinkedIn**: [Sanjula Herath](https://linkedin.com/in/sanjulaherath)
- **Twitter**: [@sanjulaweb3](https://twitter.com/sanjulaweb3)
- **Instagram**: [@s_njula._.xz._](https://www.instagram.com/s_njula._.xz._/)
- **Email**: [sanjula692@gmail.com](mailto:sanjula692@gmail.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
