import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation';

export interface WorkSampleImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-work-samples',
  imports: [CommonModule],
  templateUrl: './work-samples.html',
  styleUrl: './work-samples.scss'
})
export class WorkSamples {
  constructor(public translate: TranslationService) {}

  // Accept custom images via @Input, but provide sensible defaults
  // WORK SAMPLES (8 items) - Filenames preserved exactly as they exist in /assets/website images/
  @Input() images: WorkSampleImage[] = [
    {
      src: 'assets/website images/14407cd6-22a8-44db-9236-11fb32862794.png',
      alt: 'Utopia streetwear t-shirt with bold graphic print'
    },
    {
      src: 'assets/website images/a655585c-a03f-4599-a148-15d269fe9a50.png',
      alt: 'Green Is The New Cool long sleeve shirt with eco-friendly message'
    },
    {
      src: 'assets/website images/5cd7fe6c-fb61-4b16-8b4d-b436532f6373.png',
      alt: 'Cultiva sweatshirt with embroidered branding'
    },
    {
      src: 'assets/website images/161ee087-0f2f-4960-b4d1-f5040b814452.png',
      alt: 'Black Squad hoodie front view with premium finishing'
    },
    {
      src: 'assets/website images/a7e2292a-acad-4cb8-a49a-a7c9dd5a563d.png',
      alt: 'Butterfly hoodie featuring embroidery and vinyl details'
    },
    {
      src: 'assets/website images/b0aa4fa1-96b1-4c1d-a40c-e99d21a204f9.png',
      alt: 'Saints of House hoodie back print showcasing detailed graphics'
    },
    {
      src: 'assets/website images/60b0a178-a582-4166-9753-167046c9b269.png',
      alt: 'Checked trousers in green and blue colorway'
    },
    {
      src: 'assets/website images/98436a84-adf9-4831-b8d0-7ef1c5461620.png',
      alt: 'Kids Paw Patrol sweatshirt with licensed character design'
    }
  ];

  // Optional additional operational/factory images (commented for future use)
  /*
  alternativeImages: WorkSampleImage[] = [
    {
      src: 'assets/website images/Screenshot 2025-10-26 at 18.14.13.png',
      alt: 'Factory exterior wide view'
    },
    {
      src: 'assets/website images/Screenshot 2025-10-26 at 18.14.01.png',
      alt: 'Factory building front entrance'
    },
    {
      src: 'assets/website images/Screenshot 2025-10-26 at 18.14.51.png',
      alt: 'Production tables with cutting and assembly operations'
    },
    {
      src: 'assets/website images/Screenshot 2025-10-26 at 18.14.41.png',
      alt: 'Production floor with sewing machines and workers'
    }
  ];
  */

  // Lightbox state
  isLightboxOpen = false;
  currentImageIndex = 0;

  t(key: string): any {
    return this.translate.get(key);
  }

  // Open lightbox at specific image index
  openLightbox(index: number): void {
    this.currentImageIndex = index;
    this.isLightboxOpen = true;
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  closeLightbox(): void {
    this.isLightboxOpen = false;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Navigate to previous image
  previousImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.images.length - 1
        : this.currentImageIndex - 1;
  }

  // Navigate to next image
  nextImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.currentImageIndex =
      this.currentImageIndex === this.images.length - 1
        ? 0
        : this.currentImageIndex + 1;
  }

  // Keyboard navigation (ESC to close, Left/Right arrows to navigate)
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isLightboxOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
