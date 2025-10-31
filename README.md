<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Cybernetic Navigator

**A Futuristic AI-Powered Browser with Cyberpunk Aesthetics**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI-4285F4.svg)](https://ai.google.dev/)

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#-usage)
  - [AI Search](#ai-search)
  - [Text Summarization](#text-summarization)
  - [Theme Generation](#theme-generation)
  - [Bookmarks & History](#bookmarks--history)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Links](#-links)

## 🌟 Overview

**Cybernetic Navigator** is a simulation of a next-generation browser interface that combines cutting-edge AI capabilities with a stunning cyberpunk aesthetic. Built with React and TypeScript, it leverages Google's Gemini AI to provide intelligent search, content summarization, and dynamic theme generation.

This project showcases how AI can be seamlessly integrated into familiar interfaces to create a more intelligent and visually striking user experience.

## ✨ Features

### 🔍 **AI-Powered Smart Search**
- Natural language query processing
- Contextual responses powered by Google Gemini AI
- Futuristic command interface

### 📝 **Intelligent Text Summarization**
- Summarize long-form content into concise bullet points
- Save and review summarization history
- Perfect for quick information extraction

### 🎨 **AI Theme Generator**
- Generate custom cyberpunk color schemes using AI
- Dynamic theme application in real-time
- Create themes based on mood, color preferences, or concepts

### 🔖 **Advanced Bookmarks System**
- Save and organize favorite URLs
- Quick access and management
- Persistent storage across sessions

### 📜 **Browsing History**
- Automatic URL tracking
- Navigate through previously visited sites
- Limited to last 50 entries for performance

### ⚙️ **Customizable Settings**
- Configure your own Google Gemini API key
- Secure local storage of preferences
- Easy API key management

### 🎭 **Cyberpunk UI/UX**
- Neon glow effects and animations
- Retro-futuristic design elements
- Responsive and resizable panels
- Custom cyberpunk-themed components

## 📸 Screenshots

*Screenshots showcasing the application's interface and features will be added here*

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 19.1** | UI framework for building interactive components |
| **TypeScript 5.8** | Type-safe development and enhanced code quality |
| **Vite 6.2** | Lightning-fast build tool and dev server |
| **Google Gemini AI** | Advanced AI capabilities for search, summarization, and generation |
| **CSS3** | Custom styling with CSS variables and modern features |
| **LocalStorage API** | Client-side data persistence |

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** (v7.0 or higher) or **yarn**
- A **Google Gemini API key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GizzZmo/Cybernetic-Navigator.git
   cd Cybernetic-Navigator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

You have two options for configuring the Google Gemini API key:

#### Option 1: Environment Variable (Recommended for Development)
Create a `.env.local` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
```

#### Option 2: In-App Settings (User-Friendly)
1. Launch the application
2. Navigate to the **Settings** panel
3. Enter your API key in the provided input field
4. The key will be stored securely in your browser's local storage

> **⚠️ Security Note:** Never commit your API key to version control. The `.gitignore` file is configured to exclude `.env.local` files.

## 💻 Usage

### Running the Application

**Development Mode:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or another port if 5173 is occupied).

**Production Build:**
```bash
npm run build
npm run preview
```

### AI Search

1. Navigate to the **Search** panel
2. Enter your query or command in natural language
3. Click **Execute** or press **Enter**
4. View AI-generated responses in real-time

**Example queries:**
- "What is quantum computing?"
- "Explain blockchain technology"
- "Generate a cyberpunk story"

### Text Summarization

1. Open the **Summarize** panel
2. Paste or type the text you want to summarize
3. Click **Summarize**
4. View the condensed version with key points
5. Access past summarizations from the history section

### Theme Generation

1. Go to the **Theme** panel
2. Describe your desired theme (e.g., "neon green matrix style", "deep ocean blue")
3. Click **Generate**
4. Watch as the entire interface transforms with your custom color scheme

### Bookmarks & History

**Bookmarks:**
- Click the star icon in the viewport to bookmark the current URL
- Access saved bookmarks in the **Bookmarks** panel
- Delete bookmarks by clicking the trash icon

**History:**
- Browse your navigation history in the viewport's history dropdown
- History is automatically saved and limited to 50 recent URLs

## 📁 Project Structure

```
Cybernetic-Navigator/
├── components/
│   ├── AIPanels.tsx          # All AI-powered panel components
│   ├── Header.tsx             # Application header
│   ├── StatusBar.tsx          # Bottom status bar
│   └── common/
│       └── CyberElements.tsx  # Reusable cyberpunk-styled UI components
├── services/
│   └── geminiService.ts       # Google Gemini AI integration
├── App.tsx                    # Main application component
├── index.tsx                  # Application entry point
├── types.ts                   # TypeScript type definitions
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally

### Key Components

- **App.tsx** - Main application logic, state management, and layout
- **AIPanels.tsx** - Contains all AI-powered panels (Search, Summarize, Theme Generator)
- **ViewportPanel** - Browser viewport simulation with URL navigation
- **CyberElements.tsx** - Reusable UI components with cyberpunk styling

### State Management

The application uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and data persistence
- `useCallback` for optimized event handlers
- `useRef` for DOM references and resize operations

### Data Persistence

- **LocalStorage** is used for:
  - API key storage
  - Bookmarks
  - Browsing history
  - Summarization history
  
## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo:** [View in AI Studio](https://ai.studio/apps/drive/1-nv0Eg4iFo_fR3R16oVkqzbGpqwznWzK)
- **Repository:** [GitHub](https://github.com/GizzZmo/Cybernetic-Navigator)
- **Google Gemini AI:** [Documentation](https://ai.google.dev/)

---

<div align="center">
  <p>Built with ❤️ and ⚡ by the Cybernetic Navigator team</p>
  <p>Powered by Google Gemini AI</p>
</div>
