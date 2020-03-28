import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class DataStorateService {
	constructor(private storage: Storage) {}

	//#region language
	async languageSet(lang: string) {
		return this.storage.set('lang', lang);
	}
	async languageGet(): Promise<string> {
		try {
			const l = await this.storage.get('lang');
			if (l == null) return await this.languageSet('en');
			return l;
		} catch (error) {
			throw error;
		}
	}
	async languageDelete() {
		return await this.storage.get('lang');
	}
	//#endregion
}
