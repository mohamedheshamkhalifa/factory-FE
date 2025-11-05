# New Homepage Sections - Implementation Guide

## Overview
Two new standalone Angular components have been added to the Kemet Garment homepage:

1. **InsideKemetSection** - A 3-image responsive grid showcasing operations, logistics, and team
2. **WorkSamplesSection** - An 8-item product gallery with interactive lightbox

Both sections are placed **immediately after the "Our Capabilities" section** on the homepage.

---

## Components Created

### 1. Inside Kemet Garment Section
**Location:** `/src/app/components/inside-kemet/`

**Files:**
- `inside-kemet.ts` - Component logic
- `inside-kemet.html` - Template
- `inside-kemet.scss` - Styles

**Features:**
- 3-column responsive grid (1 column on mobile, 3 on desktop)
- Images with 16:9 aspect ratio, object-cover, rounded corners
- Hover effects: zoom (1.05x) + tan overlay (20% opacity)
- Lazy loading with `loading="lazy"` and `decoding="async"`
- Captions in Montserrat semibold font
- Centered tan divider (#D7B894)

**Default Images (can be customized via @Input):**
```typescript
images = [
  {
    src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg',
    alt: 'Raw cotton warehouse with workers in yellow safety vests',
    caption: 'Raw Material Sourcing'
  },
  {
    src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (3).jpeg',
    alt: 'Export container yard with Seaco and Hamburg Süd containers',
    caption: 'Export & Logistics'
  },
  {
    src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.27.55 PM.jpeg',
    alt: 'Kemet Garment team members in front of company building',
    caption: 'Our Team in Alexandria'
  }
];
```

---

### 2. Work Samples Gallery Section
**Location:** `/src/app/components/work-samples/`

**Files:**
- `work-samples.ts` - Component logic with lightbox functionality
- `work-samples.html` - Template with lightbox overlay
- `work-samples.scss` - Styles including lightbox UI

**Features:**
- Responsive grid: 1 col mobile → 2 col tablet → 4 col desktop
- Images with 4:5 aspect ratio (portrait, ideal for apparel)
- Hover effects: lift (translateY -4px), zoom (1.05x), tan bottom border
- **Dependency-free lightbox** with:
  - Full-viewport overlay
  - Click/ESC to close
  - Arrow keys (←/→) for navigation
  - Navigation buttons (Previous/Next)
  - Image counter (e.g., "3 / 8")
  - Caption display
  - Background scroll prevention while open
- Fully accessible with ARIA labels
- Lazy loading on all images

**Default Images (8 work samples):**
```typescript
images = [
  { src: 'assets/website images/14407cd6-22a8-44db-9236-11fb32862794.png', alt: 'Utopia streetwear t-shirt' },
  { src: 'assets/website images/a655585c-a03f-4599-a148-15d269fe9a50.png', alt: 'Green Is The New Cool LS' },
  { src: 'assets/website images/5cd7fe6c-fb61-4b16-8b4d-b436532f6373.png', alt: 'Cultiva sweatshirt' },
  { src: 'assets/website images/161ee087-0f2f-4960-b4d1-f5040b814452.png', alt: 'Black Squad hoodie front' },
  { src: 'assets/website images/a7e2292a-acad-4cb8-a49a-a7c9dd5a563d.png', alt: 'Butterfly hoodie embroidery' },
  { src: 'assets/website images/b0aa4fa1-96b1-4c1d-a40c-e99d21a204f9.png', alt: 'Saints of House hoodie back' },
  { src: 'assets/website images/60b0a178-a582-4166-9753-167046c9b269.png', alt: 'Checked trousers' },
  { src: 'assets/website images/98436a84-adf9-4831-b8d0-7ef1c5461620.png', alt: 'Kids Paw Patrol sweatshirt' }
];
```

**Optional Alternative Images (commented in code):**
```typescript
// Factory/operations images available for swapping:
// - Screenshot 2025-10-26 at 18.14.13.png (exterior wide)
// - Screenshot 2025-10-26 at 18.14.01.png (building front)
// - Screenshot 2025-10-26 at 18.14.51.png (production tables)
// - Screenshot 2025-10-26 at 18.14.41.png (production floor)
```

---

## Integration

### Files Modified

#### 1. `/src/app/app.ts`
Added imports and component declarations:
```typescript
import { InsideKemet } from './components/inside-kemet/inside-kemet';
import { WorkSamples } from './components/work-samples/work-samples';

@Component({
  imports: [
    // ... existing imports
    Capabilities,
    InsideKemet,    // Added after Capabilities
    WorkSamples,    // Added after InsideKemet
    Services,
    // ... rest
  ]
})
```

#### 2. `/src/app/app.html`
Added component selectors:
```html
<div class="landing-page">
  <!-- ... existing components ... -->
  <app-capabilities />
  <app-inside-kemet />     <!-- NEW -->
  <app-work-samples />     <!-- NEW -->
  <app-services />
  <!-- ... rest ... -->
</div>
```

#### 3. `/src/index.html`
Added Google Fonts (Montserrat + Open Sans):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Design System Compliance

### Colors
- **Papyrus Tan:** `#D7B894` (accent borders, dividers, overlays)
- **Black:** `#0C0C0C` (text, lightbox overlay)
- **Light Background:** `#F8F8F8` (section backgrounds)

### Typography
- **Headings:** Montserrat (weights: 400, 600, 700)
- **Body:** Open Sans (weights: 400, 500, 600)
- **Captions:** Montserrat Semibold (600)

### Visual Style
- Minimalist, export-ready, premium aesthetic
- Subtle hover effects (no aggressive animations)
- Soft shadows (box-shadow with low opacity)
- Rounded corners (`border-radius: 0.75rem`)
- Smooth transitions (0.3-0.4s ease)

---

## Customization Guide

### Change Images

#### For Inside Kemet Section:
Edit `/src/app/components/inside-kemet/inside-kemet.ts` at line 18-41:

```typescript
@Input() images: InsideKemetImage[] = [
  {
    src: 'assets/website images/YOUR_NEW_IMAGE.jpeg',
    alt: 'Descriptive alt text',
    caption: 'Your Caption'
  },
  // ... add more
];
```

#### For Work Samples Section:
Edit `/src/app/components/work-samples/work-samples.ts` at line 18-57:

```typescript
@Input() images: WorkSampleImage[] = [
  {
    src: 'assets/website images/YOUR_PRODUCT.png',
    alt: 'Product description for accessibility'
  },
  // ... add 7 more for 8 total (or adjust grid)
];
```

### Adjust Layout

#### Grid Columns (Work Samples):
Edit `/src/app/components/work-samples/work-samples.scss` lines 23-35:

```scss
.work-samples-grid {
  grid-template-columns: 1fr; // Mobile: 1 column

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); // Tablet: 2 columns
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); // Desktop: 4 columns (change to 3 or 5 if needed)
  }
}
```

#### Image Aspect Ratio:
- **Inside Kemet:** Change `aspect-ratio: 16 / 9;` in `inside-kemet.scss` line 61
- **Work Samples:** Change `aspect-ratio: 4 / 5;` in `work-samples.scss` line 79

---

## Accessibility Features

✅ Lazy loading with `loading="lazy"` and `decoding="async"`
✅ Descriptive `alt` text on all images
✅ ARIA labels on lightbox buttons (`aria-label`, `role="dialog"`, `aria-modal`)
✅ Keyboard navigation (ESC, ←, → keys)
✅ Focus-visible outlines (tan #D7B894 accent)
✅ Background scroll prevention in lightbox
✅ Semantic HTML (buttons for interactive elements)

---

## Performance Optimizations

✅ All images lazy-loaded
✅ `decoding="async"` for non-blocking image decode
✅ Max widths prevent excessive downloads
✅ CSS transitions use `transform` (GPU-accelerated)
✅ Minimal JavaScript (only lightbox state management)
✅ No external dependencies for lightbox

---

## Testing Checklist

### Desktop (1024px+)
- [ ] Inside Kemet: 3 columns displayed
- [ ] Work Samples: 4 columns displayed
- [ ] Hover effects work (zoom, tan overlay/border)
- [ ] Lightbox opens on click
- [ ] Lightbox navigation works (arrows, keyboard)
- [ ] ESC key closes lightbox
- [ ] Background scroll disabled when lightbox open

### Tablet (768px - 1023px)
- [ ] Work Samples: 2 columns displayed
- [ ] Images maintain aspect ratio

### Mobile (<768px)
- [ ] All grids collapse to 1 column
- [ ] Touch scrolling works smoothly
- [ ] Lightbox is responsive (smaller navigation buttons)
- [ ] Images load lazily on scroll

### Accessibility
- [ ] Tab navigation works through all cards
- [ ] Screen reader announces image descriptions
- [ ] Focus outlines visible on keyboard navigation
- [ ] Color contrast meets WCAG AA standards

---

## Running Locally

1. **Start development server:**
   ```bash
   npm start
   ```

2. **Open browser:**
   Navigate to `http://localhost:4200/`

3. **View sections:**
   Scroll down past "Our Capabilities" to see the new sections

4. **Test lightbox:**
   Click any image in "Our Work" section

---

## File Structure

```
src/app/
├── components/
│   ├── inside-kemet/
│   │   ├── inside-kemet.ts         # Component logic
│   │   ├── inside-kemet.html       # Template
│   │   └── inside-kemet.scss       # Styles
│   ├── work-samples/
│   │   ├── work-samples.ts         # Component logic + lightbox
│   │   ├── work-samples.html       # Template + lightbox UI
│   │   └── work-samples.scss       # Styles + lightbox styles
│   └── ... (other components)
├── app.ts                          # Main app component (imports added)
└── app.html                        # Main template (selectors added)

src/
├── index.html                      # Google Fonts added
└── assets/
    └── website images/             # All images stored here
        ├── WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg
        ├── 14407cd6-22a8-44db-9236-11fb32862794.png
        └── ... (other images)
```

---

## RTL Support

Both components include RTL (Right-to-Left) language support:

```scss
[dir="rtl"] {
  // Grid direction reversal
  // Navigation button repositioning
  // Text alignment adjustments
}
```

To enable RTL, set `dir="rtl"` on the `<html>` element.

---

## Next Steps

1. **Test locally** at `http://localhost:4200/` ✅ (Server running)
2. **Review styling** and adjust spacing/colors if needed
3. **Swap images** by editing the default arrays in component files
4. **Add translations** for i18n support (currently English only)
5. **Run build** to verify production bundle: `npm run build`
6. **Commit changes** when satisfied:
   ```bash
   git add .
   git commit -m "Add Inside Kemet and Work Samples sections to homepage"
   ```

---

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Angular 20.3.0 target browsers
- ✅ CSS Grid (IE11+ not supported, which is fine for 2025)
- ✅ JavaScript ES2022+ features (handled by Angular CLI transpilation)

---

## Questions or Issues?

If you need to adjust anything:

1. **Change image order:** Reorder items in the `images` array
2. **Add more images:** Append to the `images` array
3. **Remove a section:** Delete the component import and selector
4. **Adjust spacing:** Modify padding values in `.inside-kemet` or `.work-samples` classes
5. **Change fonts:** Update font-family in SCSS files or Google Fonts link

---

**Implementation Complete!** 🎉

All components are production-ready with clean, commented code following Angular 18+ best practices.
