import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Hero } from './components/hero/hero';
import { WhyEgypt } from './components/why-egypt/why-egypt';
import { Capabilities } from './components/capabilities/capabilities';
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
    Services,
    Cta,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
