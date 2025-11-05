import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation';

export interface InsideKemetImage {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-inside-kemet',
  imports: [CommonModule],
  templateUrl: './inside-kemet.html',
  styleUrl: './inside-kemet.scss'
})
export class InsideKemet {
  constructor(public translate: TranslationService) {}

  // Accept custom images via @Input, but provide sensible defaults
  // Filenames preserved exactly as they exist in /assets/website images/
  @Input() images: InsideKemetImage[] = [
    {
      src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (1).jpeg',
      alt: 'Kemet Garment raw cotton warehouse in Alexandria Egypt showing quality material sourcing with workers in yellow safety vests organizing textile inventory for garment manufacturing',
      caption: 'Raw Material Sourcing'
    },
    {
      src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (3).jpeg',
      alt: 'Kemet Garment export container yard in Alexandria showing international shipping logistics with Seaco and Hamburg Süd containers ready for global garment export from Egypt',
      caption: 'Export & Logistics'
    },
    {
      src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.27.55 PM.jpeg',
      alt: 'Kemet Garment professional team members and skilled workers standing in front of the manufacturing facility building in Alexandria Egypt showcasing our dedicated garment production workforce',
      caption: 'Our Team in Alexandria'
    }
  ];

  t(key: string): any {
    return this.translate.get(key);
  }
}
