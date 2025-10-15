import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Language = 'en' | 'ar' | 'de' | 'tr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = signal<any>({});
  public currentLanguage = signal<Language>('en');

  constructor(private http: HttpClient) {
    // Load default language on initialization
    const savedLang = localStorage.getItem('language') as Language;
    const defaultLang = savedLang || 'en';
    this.loadLanguage(defaultLang);
  }

  loadLanguage(lang: Language) {
    this.http.get(`assets/i18n/${lang}.json`).subscribe({
      next: (translations) => {
        this.translations.set(translations);
        this.currentLanguage.set(lang);
        localStorage.setItem('language', lang);

        // Set document direction for RTL languages
        if (lang === 'ar') {
          document.documentElement.setAttribute('dir', 'rtl');
          document.documentElement.setAttribute('lang', 'ar');
        } else {
          document.documentElement.setAttribute('dir', 'ltr');
          document.documentElement.setAttribute('lang', lang);
        }
      },
      error: (err) => console.error('Error loading translations:', err)
    });
  }

  get(key: string): any {
    const keys = key.split('.');
    let result = this.translations();

    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return result || key;
  }

  switchLanguage(lang: Language) {
    this.loadLanguage(lang);
  }

  getAvailableLanguages(): { code: Language; name: string; flag: string }[] {
    return [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'ar', name: 'العربية', flag: '🇪🇬' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];
  }
}
