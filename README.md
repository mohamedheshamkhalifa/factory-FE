# kemet garment - Factory Portal

A modern, multilingual landing page for kemet garment manufacturing company based in Alexandria, Egypt. Built with Angular 20, featuring full internationalization (i18n) support for English, Arabic, German, and Turkish.

## 🌟 Features

- **Multilingual Support (i18n)**: Four languages with seamless switching
  - 🇬🇧 English (default)
  - 🇪🇬 Arabic (with RTL support)
  - 🇩🇪 German
  - 🇹🇷 Turkish

- **Responsive Design**: Mobile-first approach with hamburger menu
- **Component-Based Architecture**: Clean, maintainable code structure
- **Modern Angular**: Built with Angular 20 standalone components
- **Smooth Animations**: Professional UI transitions and effects
- **SEO Friendly**: Semantic HTML structure

## 📁 Project Structure

```
portal/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── navigation/      # Header with language switcher
│   │   │   ├── hero/            # Hero section with stats
│   │   │   ├── why-egypt/       # Benefits section
│   │   │   ├── capabilities/    # Manufacturing capabilities
│   │   │   ├── services/        # Services offered
│   │   │   ├── cta/             # Call-to-action section
│   │   │   ├── contact/         # Contact form & info
│   │   │   └── footer/          # Footer links & info
│   │   ├── services/            # Business logic services
│   │   │   └── translation.ts   # i18n translation service
│   │   ├── pipes/               # Custom pipes
│   │   │   └── translate-pipe.ts
│   │   ├── app.ts               # Root component
│   │   ├── app.html             # Main template
│   │   └── app.scss             # Global styles
│   ├── assets/
│   │   ├── i18n/                # Translation files
│   │   │   ├── en.json          # English translations
│   │   │   ├── ar.json          # Arabic translations
│   │   │   ├── de.json          # German translations
│   │   │   └── tr.json          # Turkish translations
│   │   └── kemet garment Branding Logo.PNG
│   └── index.html
├── angular.json                  # Angular configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20 or higher)

### Installation

1. **Clone the repository**
   ```bash
   cd portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🌐 Internationalization (i18n)

### How It Works

The application uses a custom translation service that:
- Loads JSON translation files from `src/assets/i18n/`
- Stores user language preference in `localStorage`
- Automatically switches to RTL layout for Arabic
- Updates all text content dynamically

### Adding a New Language

1. **Create translation file**
   ```bash
   # Copy an existing translation file
   cp src/assets/i18n/en.json src/assets/i18n/fr.json
   ```

2. **Translate the content**
   Edit `fr.json` with French translations

3. **Update the translation service**
   Edit `src/app/services/translation.ts`:
   ```typescript
   getAvailableLanguages(): { code: Language; name: string; flag: string }[] {
     return [
       { code: 'en', name: 'English', flag: '🇬🇧' },
       { code: 'ar', name: 'العربية', flag: '🇪🇬' },
       { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
       { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
       { code: 'fr', name: 'Français', flag: '🇫🇷' }  // Add new language
     ];
   }
   ```

4. **Update Language type**
   ```typescript
   export type Language = 'en' | 'ar' | 'de' | 'tr' | 'fr';  // Add 'fr'
   ```

### Using Translations in Components

```typescript
// In component TypeScript file
export class MyComponent {
  constructor(public translate: TranslationService) {}

  t(key: string): any {
    return this.translate.get(key);
  }
}
```

```html
<!-- In component template -->
<h1>{{ t('section.title') }}</h1>
<p>{{ t('section.description') }}</p>
```

## 🎨 Styling

### Global Styles
Main styles are in `src/app/app.scss` and include:
- Navigation styles
- Section layouts
- RTL support
- Language switcher styles
- Mobile responsive styles

### Component Styles
Each component has its own SCSS file:
```
src/app/components/[component-name]/[component-name].scss
```

### RTL (Right-to-Left) Support
Automatic RTL layout for Arabic:
```scss
[dir="rtl"] {
  .logo-section {
    flex-direction: row-reverse;
  }
  // ... more RTL-specific styles
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Mobile features:
- Hamburger menu
- Touch-optimized buttons
- Stacked layouts
- Language selector in mobile menu

## 🏗️ Component Architecture

### Navigation Component
- Sticky header with scroll effects
- Desktop navigation links
- Language switcher dropdown
- Mobile hamburger menu
- Logo and branding

### Hero Component
- Main headline and description
- Call-to-action buttons
- Statistics grid (Years, Workers, Units, Delivery)
- Factory icon placeholder

### Why-Egypt Component
- Three feature cards:
  - Strategic Location
  - Cost Competitive
  - Export Ready

### Capabilities Component
- Manufacturing facilities list
- Production process list
- Badge cards (MOQs, Team, Certification)

### Services Component
- Grid of manufacturing services
- Each service with icon, title, description

### CTA Component
- Simple call-to-action section
- Encourages user to request quote

### Contact Component
- Contact information (location, phone, email)
- Business hours
- Contact form with validation

### Footer Component
- Logo and description
- Quick links
- Services list
- Certifications list
- Copyright information

## 🔧 Development

### Build for Production
```bash
npm run build
# Output will be in dist/ folder
```

### Run Tests
```bash
npm test
```

### Code Formatting
The project uses Prettier for code formatting:
```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

### Linting
```bash
ng lint
```

## 📦 Dependencies

### Main Dependencies
- `@angular/core`: ^20.3.0
- `@angular/common`: ^20.3.0
- `@angular/router`: ^20.3.0
- `rxjs`: ~7.8.0

### Dev Dependencies
- `@angular/cli`: ^20.3.5
- `@angular/build`: ^20.3.5
- `typescript`: ~5.9.2

## 🎯 Features in Detail

### Language Switcher
- Globe icon (🌐) in navigation
- Dropdown menu with flags
- Saves preference to localStorage
- Instant language switching
- Mobile-friendly

### Translation Service
Located at `src/app/services/translation.ts`:
```typescript
class TranslationService {
  loadLanguage(lang: Language)     // Load translation file
  get(key: string): any            // Get translation by key
  switchLanguage(lang: Language)   // Change language
  getAvailableLanguages()          // Get all languages
}
```

### Automatic RTL
When Arabic is selected:
- Document direction changes to RTL
- Text alignment adjusts
- Icons flip direction
- Flex layouts reverse

## 🌍 Deployment

### Build Command
```bash
ng build --configuration=production
```

### Deploy to Hosting
The built files in `dist/` folder can be deployed to:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables
Configure in `angular.json` or environment files as needed.

## 📝 Content Updates

### Updating Text Content
1. Edit translation files in `src/assets/i18n/`
2. Follow the JSON structure
3. Save and refresh browser

### Updating Images
1. Place images in `src/assets/`
2. Reference in templates: `src="assets/your-image.png"`
3. Update all language versions if text in image

### Contact Information
Update contact details in translation files:
```json
{
  "contact": {
    "info": {
      "phone": { "value": "+20 (XXX) XXX-XXXX" },
      "email": { "value": "info@kemetgarment.com" }
    }
  }
}
```

## 🐛 Troubleshooting

### Language not switching
1. Check browser console for errors
2. Verify translation JSON file exists
3. Clear localStorage: `localStorage.clear()`
4. Hard refresh browser (Ctrl+Shift+R)

### Logo not showing
1. Verify file exists in `src/assets/`
2. Check filename matches exactly (case-sensitive)
3. Restart development server: `ng serve`
4. Check angular.json assets configuration

### Build errors
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Clear Angular cache:
   ```bash
   ng cache clean
   ```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly (all 4 languages)
4. Submit pull request

## 📄 License

All rights reserved © 2025 Kemet Garment

## 📧 Contact

For questions or support:
- **Email**: info@kemetgarment.com
- **Location**: Alexandria, Egypt

---

**Built with ❤️ using Angular 20**
