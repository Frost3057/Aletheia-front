# 🔍 Aletheia

![GIF(1)](https://github.com/user-attachments/assets/01802dbc-019e-4a92-81f1-582d1666372f)

## What is Aletheia?

Aletheia is an AI-powered platform that transforms the way you create reports and presentations. Built with modern web technologies, it combines the power of AI with an intuitive interface to help you generate meaningful insights and share them effortlessly.

## Why Aletheia?

Creating polished reports and presentations from scratch takes time. We built Aletheia to change that—by leveraging AI, you can now focus on what matters: your ideas. Let the AI handle the heavy lifting of generating insights, while you present them beautifully.

## Getting Started

### What You Need

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. That's it!

### Setup

Getting Aletheia running on your machine is super simple:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open your browser and head to [http://localhost:5173/](http://localhost:5173/) — you're ready to go!

### Ready for Production?

When you're happy with your changes, build the project for production:

```bash
npm run build
```

## How to Use

### Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Build for production
npm run preview  # Preview your production build
```

### Project Layout

```
src/
  ├── components/  # Reusable UI components
  ├── screens/     # Page components (Report, Slide, etc.)
  ├── services/    # API integrations
  └── lib/         # Helper utilities
public/            # Static files
```

## API Integration

Aletheia integrates with the following endpoints:

- **GET /articles** - Fetches trending articles (max 5)
- **POST /generate** - Generates analysis for general users
- **POST /generate-report** - Generates detailed reports for journalists

## Features

- 📊 **AI-Powered Analysis** - Get credibility scores and bias detection
- 🎯 **User-Specific Views** - Different experiences for general users vs journalists
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with modern React and Vite
- 🔍 **Real-time Search** - Instant analysis of any content

## Want to Help?

We'd love to have you contribute! Here's how:

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/something-cool`
3. Commit your work: `git commit -m 'Add something cool'`
4. Push it: `git push origin feature/something-cool`
5. Open a Pull Request

Just make sure your code is clean and follows the project's style. If you're adding something big, tests are appreciated too!

---

Made with ❤️ by Aman Bajpai
