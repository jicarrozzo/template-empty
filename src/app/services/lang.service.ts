import { Injectable } from '@angular/core';
import { UiNotificationHelper } from './uinotification.helper';
import { TranslateService } from '@ngx-translate/core';
import { DataStorateService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class LangTranslationService {
	constructor(
		private uihelper: UiNotificationHelper,
		private translatorService: TranslateService,
		private dataService: DataStorateService
	) {}

	/**
   * Initialize the language service
   */
	async languageInit() {
		try {
			const lang = await this.dataService.languageGet();
			this.translatorService.use(lang);
		} catch (error) {}
	}
	/**
   * Shows the actionSheet to change the language
   */
	async languageChange() {
		await this.uihelper.actionCustom(this.translatorService.instant('GENERIC.LANGUAGE.TITLE'), [
			{
				text: 'English',
				handler: () => {
					this.languageSet('en');
				}
			},
			{
				text: 'Русский',
				handler: () => {
					this.languageSet('ru');
				}
			},
			{
				text: 'Español',
				handler: () => {
					this.languageSet('es');
				}
			}
		]);
	}

	/**
   * Changes the app language
   * @param lang 
   */
	async languageSet(lang: string) {
		await this.dataService.languageSet(lang);
		await this.languageInit();
		return lang;
	}
}
