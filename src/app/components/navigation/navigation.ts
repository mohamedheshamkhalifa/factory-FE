import { Component, signal, HostListener } from '@angular/core';
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

  constructor(public translate: TranslationService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
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
