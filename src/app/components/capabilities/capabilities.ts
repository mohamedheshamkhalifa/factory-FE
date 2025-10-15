import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-capabilities',
  imports: [CommonModule],
  templateUrl: './capabilities.html',
  styleUrl: './capabilities.scss'
})
export class Capabilities {
  constructor(public translate: TranslationService) {}

  t(key: string): any {
    return this.translate.get(key);
  }
}
