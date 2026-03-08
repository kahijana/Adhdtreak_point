# STREAK — Activity Points PWA

A Progressive Web App for tracking daily activity points and building streaks.

## Features

- 🏆 Track daily activities with points
- 🔥 Build and maintain streaks
- 📊 Level system with progress tracking
- 🌓 Dark/Light theme support
- 📱 PWA support - works offline
- 🔄 Undo last action (5 second window)
- 🎨 Custom activities with emoji icons
- 📋 Quick buttons for common activities
- ↔️ Drag to reorder quick buttons
- 💾 All data stored locally (localStorage)

## Project Structure

```
streak-pwa/
├── index.html          # Main application file
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable-512.png
└── README.md
```

## Running Locally

### Option 1: Using `serve` (recommended)

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

### Option 2: Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js http-server

```bash
npx http-server .
```

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the `streak-pwa` folder
3. Run: `vercel`
4. Follow the prompts

Vercel will automatically detect it as a static site and deploy it.

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Navigate to the `streak-pwa` folder
3. Run: `netlify deploy`
4. Follow the prompts

Or drag and drop the `streak-pwa` folder to [Netlify Drop](https://app.netlify.com/drop).

### GitHub Pages

1. Create a new repository on GitHub
2. Push the contents of `streak-pwa` folder to the repository
3. Go to Settings → Pages
4. Select the main branch as source
5. Your app will be available at `https://<username>.github.io/<repo>/`

## PWA Install Instructions

### Android (Chrome)

1. Open the app in Chrome
2. Tap the menu (⋮) → "Install app" or "Add to Home screen"
3. Confirm the installation
4. The app will appear on your home screen

### iOS (Safari)

1. Open the app in Safari
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner
5. The app will appear on your home screen

### Desktop (Chrome/Edge)

1. Open the app in Chrome or Edge
2. Look for the install icon in the address bar
3. Click "Install"
4. The app will open in its own window

## PWA Features

- **Offline Support**: The app caches all static assets and works offline after first load
- **Installable**: Can be installed to home screen on mobile and desktop
- **Standalone Mode**: Runs like a native app without browser UI
- **Theme Color**: Dynamic theme color that changes with dark/light mode
- **Apple Touch Icons**: Proper icons for iOS home screen

## Service Worker

The service worker (`sw.js`) implements:

- **Cache First** strategy for static assets
- **Network First** strategy for dynamic content
- **Versioned cache** (`streak-v2`) for easy updates
- **Pre-caching** of all static assets on install
- **Cache cleanup** on activation
- **Skip waiting** for instant activation

## Lighthouse PWA Score

This app is designed to achieve a 100% PWA score in Lighthouse:

- ✅ Manifest with required properties
- ✅ Service Worker registered
- ✅ Works offline
- ✅ HTTPS (when deployed)
- ✅ Viewport meta tag
- ✅ Apple touch icon
- ✅ Theme color meta tag

## Browser Support

- Chrome/Edge (full support)
- Firefox (full support)
- Safari (iOS 11.3+)
- Samsung Internet

## Data Storage

All data is stored in `localStorage`:

- `streak_data`: Activity entries and total points
- `streak_quick`: Custom quick buttons
- `streak_quick_order`: Custom order of quick buttons
- `streak_theme`: User's theme preference (dark/light)

## License

MIT
