import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { I18nService } from '@app/core/i18n.service';
import { Title } from '@angular/platform-browser';

@Component({
  standalone:false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav!: MatSidenav;

  constructor(private i18service: I18nService, private title: Title) { }

  ngOnInit(): void {
  }

  // Get current language for the application to use.
  setCurrentLanguage(language: string) {
    this.i18service.language = language;
  }

  // Get cuurent active language
  getCurrentLanguage(): string {
    return this.i18service.language;
  }

  // Get all supported languages
  getLanguages(): string[] {
    return this.i18service.supportedLanguages;
  }

  // Get title of the page
  getTitle(): string {
    return this.title.getTitle();
  }

}
