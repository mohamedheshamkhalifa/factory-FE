import { Component, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  mobileMenuOpen = signal(false);
  scrolled = signal(false);
  languageMenuOpen = signal(false);

  constructor(public translate: TranslationService, private elementRef: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close language menu if clicked outside
    const clickedInside = this.elementRef.nativeElement.querySelector('.language-switcher')?.contains(event.target);
    if (!clickedInside && this.languageMenuOpen()) {
      this.languageMenuOpen.set(false);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleLanguageMenu() {
    this.languageMenuOpen.update(value => !value);
  }

  changeLanguage(lang: Language) {
    this.translate.switchLanguage(lang);
    this.languageMenuOpen.set(false);
  }

  t(key: string): any {
    return this.translate.get(key);
  }
}
