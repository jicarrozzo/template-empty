import { Component, OnInit } from '@angular/core';
import { LangTranslationService } from 'src/app/services/lang.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
	constructor() {}
	async ngOnInit() {
		await this.load();
	}

	async load() {
		try {
		} catch (error) {}
	}
}
