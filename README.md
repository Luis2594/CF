# FindForce

A comprehensive mobile application built with Expo and React Native.

## Project Structure

```
/
├── app/                    # Application routes and screens
│   ├── (tabs)/            # Tab-based navigation screens
│   └── _layout.tsx        # Root layout configuration
├── assets/                # Static assets (images, fonts, etc.)
│   ├── animations/        # Lottie animation files
│   ├── fonts/            # Custom font files
│   └── images/           # Image assets
├── components/           # Reusable React components
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   └── shared/          # Shared components across screens
├── config/              # Configuration files
│   └── firebase.js     # Firebase client configuration
├── constants/          # Application constants
├── context/           # React Context providers
├── localization/      # Language translations
└── types/            # TypeScript type definitions

/functions            # Firebase Cloud Functions (separate project)
├── src/             # Functions source code
│   ├── auth/        # Authentication functions
│   ├── users/       # User management functions
│   └── utils/       # Shared utilities
├── tests/           # Test files
└── package.json     # Function dependencies
```

## Development Setup

### Frontend (Expo App)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Backend (Firebase Functions)

1. Navigate to functions directory:
```bash
cd functions
```

2. Install dependencies:
```bash
npm install
```

3. Deploy functions:
```bash
npm run deploy
```

## Building for Production

### Frontend

```bash
npm run build:web
```

### Backend

```bash
npm run deploy:functions
```

## Testing

```bash
cd functions && npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.