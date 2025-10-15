import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-why-egypt',
  imports: [CommonModule],
  templateUrl: './why-egypt.html',
  styleUrl: './why-egypt.scss'
})
export class WhyEgypt {
  constructor(public translate: TranslationService) {}

  t(key: string): any {
    return this.translate.get(key);
  }
}
