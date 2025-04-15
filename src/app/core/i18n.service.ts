import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import enUS from 'Translations/en-US.json';
import frFR from 'Translations/en-US.json';

import { Logger } from './logger.service';

const log = new Logger('I18nService');
const languageKey = 'language';

/**
 * Pass through function to mark a string for translation extraction.
 * @param s The string to extract for translation
 * @return The same string
 */
export function extractTitle(s:string)
{
  return s;
}

@Injectable()
export class I18nService {

  defaultLanguage!: string;
  supportedLanguages!: string[];

  private languageChangeSubscription!: Subscription;

  constructor(private _translateservice: TranslateService) {
    _translateservice.setTranslation('en-US', enUS);
    _translateservice.setTranslation('fr-FR', frFR);
  }

  /**
   * Initializaes i18n for the application.
   * Loads language from local storage if present, or sets the default language
   * @param defaultLanguage The default language to use.
   * @param  supportedLanguages The list of suported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    // Warning : This subscription will always be alive for the app's lifetime
    this.languageChangeSubscription = this._translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
    });
  }
/**
 * Set the current language
 * Note: The current language is saved to the local storage.
 * If no parameter is specified. The language is loaded from the local storage.
 * @param language The IETF language code to set.
 */
  set language(lang: string) {
    let language:any = lang || localStorage.getItem(languageKey) || this._translateservice.getBrowserCultureLang();
    let issupportedlanguage = this.supportedLanguages.includes(language);

    // if no exact match is found, search without the region
    if (language && !issupportedlanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find(supportedLanguage => supportedLanguage.startsWith(language) || '');
      issupportedlanguage = Boolean(language);
    }
    if (!issupportedlanguage) {
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this._translateservice.use(language);
  }

  /**
   * Cleans up language change sunscription.
   */
  destroy()
  {
    this.languageChangeSubscription.unsubscribe();
  }

  /**
   * Gets the current language
   * @returns The current language code.
   */
  get language(): string {
    return this._translateservice.currentLang;
  }
}
