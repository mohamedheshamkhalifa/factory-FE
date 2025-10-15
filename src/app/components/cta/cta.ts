import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-cta',
  imports: [CommonModule],
  templateUrl: './cta.html',
  styleUrl: './cta.scss'
})
export class Cta {
  constructor(public translate: TranslationService) {}

  t(key: string): any {
    return this.translate.get(key);
  }
}
