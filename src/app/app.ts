import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Navigation } from './components/navigation/navigation';
import { Hero } from './components/hero/hero';
import { WhyEgypt } from './components/why-egypt/why-egypt';
import { Capabilities } from './components/capabilities/capabilities';
import { InsideKemet } from './components/inside-kemet/inside-kemet';
import { WorkSamples } from './components/work-samples/work-samples';
import { Services } from './components/services/services';
import { Cta } from './components/cta/cta';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    Hero,
    WhyEgypt,
    Capabilities,
    InsideKemet,
    WorkSamples,
    Services,
    Cta,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // Set page title
    this.title.setTitle('Egyptian Garment Manufacturer | Kemet Garment Alexandria');

    // Add meta tags for SEO
    this.meta.addTags([
      { name: 'description', content: 'Kemet Garment is a B2B clothing manufacturer in Alexandria, Egypt offering OEM and private-label production with quality and reliable export logistics.' },
      { name: 'keywords', content: 'garment factory Egypt, OEM apparel factory, private label manufacturer Egypt, Alexandria garment production' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Kemet Garment — Egyptian Craftsmanship Meets Global Standards' },
      { property: 'og:description', content: 'World-class garment manufacturing from Egypt for international brands.' },
      { property: 'og:image', content: 'https://www.kemetgarment.com/assets/layerImage.png' },
      { property: 'og:url', content: 'https://www.kemetgarment.com/' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]);

    // Add JSON-LD structured data
    const ld = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kemet Garment",
      "url": "https://www.kemetgarment.com/",
      "logo": "https://www.kemetgarment.com/assets/logo.png",
      "description": "Premium garment manufacturer based in Alexandria Egypt.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Alexandria",
        "addressCountry": "Egypt"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+20-111-771-1147",
        "contactType": "sales",
        "areaServed": "Worldwide"
      }]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
  }
}
