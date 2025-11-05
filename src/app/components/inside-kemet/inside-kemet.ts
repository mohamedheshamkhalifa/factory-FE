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
      alt: 'Raw cotton warehouse with workers in yellow safety vests organizing materials',
      caption: 'Raw Material Sourcing'
    },
    {
      src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.26.55 PM (3).jpeg',
      alt: 'Export container yard with Seaco and Hamburg Süd shipping containers',
      caption: 'Export & Logistics'
    },
    {
      src: 'assets/website images/WhatsApp Image 2025-11-04 at 7.27.55 PM.jpeg',
      alt: 'Kemet Garment team members standing in front of the company building in Alexandria',
      caption: 'Our Team in Alexandria'
    }
  ];

  t(key: string): any {
    return this.translate.get(key);
  }
}
