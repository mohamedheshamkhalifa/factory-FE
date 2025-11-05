# Image Reference Guide
Quick reference for swapping images in the new sections.

## How to Change Images

### Inside Kemet Section
**File:** `src/app/components/inside-kemet/inside-kemet.ts`
**Lines:** 18-41

### Work Samples Section
**File:** `src/app/components/work-samples/work-samples.ts`
**Lines:** 18-57

---

## Current Images Used

### Inside Kemet Garment (3 images)

**1. Raw Material Sourcing**
```
assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg
```
Cotton warehouse with yellow safety vests

**2. Export & Logistics**
```
assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (3).jpeg
```
Container yard (Seaco/Hamburg Süd)

**3. Our Team in Alexandria**
```
assets/website images/WhatsApp Image 2025-11-04 at 7.27.55 PM.jpeg
```
Team photo in front of building

---

### Work Samples Gallery (8 images)

**1. Utopia T-Shirt**
```
assets/website images/14407cd6-22a8-44db-9236-11fb32862794.png
```

**2. Green Is The New Cool LS**
```
assets/website images/a655585c-a03f-4599-a148-15d269fe9a50.png
```

**3. Cultiva Sweatshirt**
```
assets/website images/5cd7fe6c-fb61-4b16-8b4d-b436532f6373.png
```

**4. Black Squad Hoodie**
```
assets/website images/161ee087-0f2f-4960-b4d1-f5040b814452.png
```

**5. Butterfly Hoodie**
```
assets/website images/a7e2292a-acad-4cb8-a49a-a7c9dd5a563d.png
```

**6. Saints of House Hoodie**
```
assets/website images/b0aa4fa1-96b1-4c1d-a40c-e99d21a204f9.png
```

**7. Checked Trousers**
```
assets/website images/60b0a178-a582-4166-9753-167046c9b269.png
```

**8. Kids Paw Patrol Sweatshirt**
```
assets/website images/98436a84-adf9-4831-b8d0-7ef1c5461620.png
```

---

## Available Alternative Images (Not Currently Used)

### Factory Operations (optional swaps)

**Exterior Wide View**
```
assets/website images/Screenshot 2025-10-26 at 18.14.13.png
```

**Building Front Entrance**
```
assets/website images/Screenshot 2025-10-26 at 18.14.01.png
```

**Production Tables**
```
assets/website images/Screenshot 2025-10-26 at 18.14.51.png
```

**Production Floor**
```
assets/website images/Screenshot 2025-10-26 at 18.14.41.png
```

**Screenshot 14:00**
```
assets/website images/Screenshot 2025-10-26 at 18.15.00.png
```

**Screenshot 13:45**
```
assets/website images/Screenshot 2025-10-26 at 18.13.45.png
```

**Additional Product**
```
assets/website images/f9e07eae-5523-460d-a893-b70c167929a3.png
```

---

## Quick Swap Example

To replace "Raw Material Sourcing" image with the factory exterior:

1. Open: `src/app/components/inside-kemet/inside-kemet.ts`
2. Find line ~20:
   ```typescript
   src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg',
   ```
3. Replace with:
   ```typescript
   src: 'assets/website images/Screenshot 2025-10-26 at 18.14.13.png',
   ```
4. Update the alt text accordingly
5. Save file - Angular will hot-reload automatically

---

## All Files in `/assets/website images/`

```
14407cd6-22a8-44db-9236-11fb32862794.png
161ee087-0f2f-4960-b4d1-f5040b814452.png
5cd7fe6c-fb61-4b16-8b4d-b436532f6373.png
60b0a178-a582-4166-9753-167046c9b269.png
98436a84-adf9-4831-b8d0-7ef1c5461620.png
a655585c-a03f-4599-a148-15d269fe9a50.png
a7e2292a-acad-4cb8-a49a-a7c9dd5a563d.png
b0aa4fa1-96b1-4c1d-a40c-e99d21a204f9.png
f9e07eae-5523-460d-a893-b70c167929a3.png
Screenshot 2025-10-26 at 18.13.45.png
Screenshot 2025-10-26 at 18.14.01.png
Screenshot 2025-10-26 at 18.14.13.png
Screenshot 2025-10-26 at 18.14.33.png
Screenshot 2025-10-26 at 18.14.41.png
Screenshot 2025-10-26 at 18.14.51.png
Screenshot 2025-10-26 at 18.15.00.png
WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg
WhatsApp Image 2025-11-04 at 7.26.55 PM (3).jpeg
WhatsApp Image 2025-11-04 at 7.27.55 PM.jpeg
```
