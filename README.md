<p align="center">
  <img src="icons/icon.png" alt="X.com Customizer" width="400">
</p>

<h1 align="center">X.com Customizer</h1>

<p align="center">A browser extension that lets you hide unwanted UI elements on X.com (Twitter), giving you a cleaner, more focused experience.</p>

## Features

Customize your X.com interface by toggling visibility of:

**Left Sidebar**
- Home, Explore, Notifications, Messages
- Grok, Lists, Bookmarks, Communities
- Premium, Verified Orgs, Profile
- More menu, Creator Studio

**Right Sidebar**
- Search bar
- Trends / What's Happening
- Who to Follow suggestions
- Subscribe to Premium prompts
- Footer links

**Floating Buttons**
- Grok button
- Messages button

## Installation

### Chrome / Edge / Brave

1. Download or clone this repository
2. Open your browser and navigate to `chrome://extensions`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `x-customizer` folder

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file

## Usage

1. Click the extension icon in your browser toolbar while on X.com
2. Toggle any elements you want to hide
3. Changes apply instantly - no page refresh needed
4. Settings sync across devices when signed into your browser

## How It Works

The extension uses CSS injection to hide elements based on X.com's `data-testid` attributes and `href` patterns. This approach is:

- **Language-independent** - Works regardless of your X.com language setting
- **Performant** - Pure CSS, no JavaScript DOM manipulation for hiding
- **Reliable** - Uses X.com's internal test IDs which are more stable than class names

## Project Structure

```
x-customizer/
├── manifest.json          # Extension configuration
├── content/
│   └── content.js         # Applies CSS classes based on settings
├── popup/
│   ├── popup.html         # Settings UI
│   ├── popup.css          # Dark theme styling
│   └── popup.js           # Settings toggle logic
├── styles/
│   └── hide.css           # CSS rules for hiding elements
└── icons/
    ├── icon.png
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Permissions

- `storage` - Save your preferences
- `activeTab` - Apply changes to the current tab
- Host permissions for `x.com` and `twitter.com`

## License

MIT
