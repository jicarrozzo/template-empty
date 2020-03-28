import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { AlertButton, AlertInput, ActionSheetButton } from '@ionic/core';
import { environment } from 'src/environments/environment';

const verbose = environment.verbose;

/**
 * Helper para mostrar mensajes en pantalla 
 * Encapsula `Toasts`, `Alerts`, `Loading`,  `ActionSheets` y `Logging`
 * 
 * @version 2.1.0
 * 
 */
@Injectable({ providedIn: 'root' })
export class UiNotificationHelper {
	constructor(
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private actionCtrl: ActionSheetController
	) {}

	//#region  Loadings
	/**
	 * Crear un objeto Loading 
	 * 
	 * @param msg Mensaje a mostrar
	 * 
	 * @returns Instancia del objeto Loading
	 */
	async createLoading(msg: string): Promise<HTMLIonLoadingElement> {
		const l = await this.loadingCtrl.create({
			spinner: 'dots',
			message: msg,
			cssClass: 'loading'
		});
		return l;
	}
	//#endregion

	//#region  Toasts
	/**
 * Crea un instancia de Toast
 * @param text mensaje a mostrar
 * @param time tiempo en pantalla (default: 2000ms)
 * 
 * @returns `Promise` del Toast ya en pantalla
 */
	async toastCustom(text: string, time?: number): Promise<void> {
		time = time || 2000;
		let toast = await this.toastCtrl.create({
			message: text,
			duration: time
		});
		return toast.present();
	}
	//#endregion

	//#region Alerts
	/**
	 * Crea un Alert con un solo boton Ok
	 * 
	 * @param title  Titulo del alerta
	 * @param messageOrSub Mensaje a mostrar o subtitulo (si se manda `message`)
	 * @param message Mensaje a mostrar (si se manda `messageOrSub`)
	 * 
	 * @returns `Promise` del alert 
	 */
	alertBasic(title: string, messageOrSub: string, message?: string): Promise<void> {
		return new Promise((resolve, reject) => {
			let buttons: Array<AlertButton> = [
				{
					text: 'Ok',
					handler: () => {
						resolve();
					}
				}
			];

			if (message == null) return this.alertCustom(title, null, messageOrSub, buttons);
			return this.alertCustom(title, messageOrSub, message, buttons);
		});
	}

	/**
	 * Crea un Alert con 2 botones ('OK' y 'Cancelar')
	 * 
	 * @param title titulo del alert
	 * @param message Mensaje a mostrar
	 * 
	 * @returns `Promise` del Alert 
	 * 
	 */
	alertYesNo(title: string, subtitle: string, message: string): Promise<void> {
		return new Promise((resolve, reject) => {
			let buttons: Array<AlertButton>;
			buttons = [
				{
					text: 'Cancelar',
					handler: () => {
						reject();
					}
				},
				{
					text: 'Aceptar',
					handler: () => {
						resolve();
					}
				}
			];

			return this.alertCustom(title, subtitle, message, buttons);
		});
	}

	/**
	 * Crea un Alert con un input tipo `string`
	 * 
	 * @param title titulo del alert
	 * @param message Mensaje a mostrar
	 * @param value Value default que va en el input
	 * @param cssClass Clase que se aplica al alert 
	 * 
	 * @returns `Promise` del Alert 
	 * 
	 */
	alertInput(title: string, subtitle: string, message: string, value: string, cssClass?: string): Promise<string> {
		return new Promise((resolve, reject) => {
			let buttons: Array<AlertButton>;
			buttons = [
				{
					text: 'Cancelar',
					handler: () => {
						reject();
					}
				},
				{
					text: 'Aceptar',
					handler: (data) => {
						resolve(data.texto);
					}
				}
			];

			let inputs: Array<AlertInput>;
			inputs = [
				{
					name: 'texto',
					type: 'text',
					value: value
				}
			];

			return this.alertCustom(title, subtitle, message, buttons, inputs, cssClass);
		});
	}

	/**
	 * Crea un Alert con un input tipo `number`
	 * 
	 * @param title titulo del alert
	 * @param message Mensaje a mostrar
	 * @param value Value default que va en el input
	 * @param cssClass Clase que se aplica al alert 
	 * 
	 * @returns `Promise` del Alert 
	 * 
	 */
	alertInputCurrency(
		title: string,
		subtitle: string,
		message: string,
		value: string,
		cssClass?: string
	): Promise<number> {
		return new Promise((resolve, reject) => {
			let buttons: Array<AlertButton>;
			buttons = [
				{
					text: 'Cancelar',
					handler: () => {
						reject();
					}
				},
				{
					text: 'Aceptar',
					handler: (data) => {
						resolve(data.importe);
					}
				}
			];

			let inputs: Array<AlertInput>;
			inputs = [
				{
					name: 'importe',
					type: 'number',
					value: value
				}
			];

			return this.alertCustom(title, subtitle, message, buttons, inputs, cssClass);
		});
	}

	/**
	 *  Crea un Alert segun los parametros enviados 
	 * 
	 * @param title titulo del alert
	 * @param message Mensaje a mostrar
	 * @param buttons Array de botones a mostrar
	 * @param inputs Array de inputs a mostrar
	 * @param cssClass Clase que se aplica al alert (default alertHelperClass)
	 * 
	 * @returns `Promise` del Alert
	 * 
	 */
	async alertCustom(
		title: string,
		subTitle: string,
		message: string,
		buttons: Array<AlertButton>,
		inputs?: Array<AlertInput>,
		cssClass?: string
	): Promise<any> {
		const alert = await this.alertCtrl.create({
			header: title,
			subHeader: subTitle,
			message: message,
			inputs: inputs,
			buttons: buttons,
			backdropDismiss: false,
			cssClass: 'alert-class ' + cssClass
		});
		await alert.present();
	}
	//#endregion

	//#region ActionSheet
	async actionCustom(title: string, buttons: Array<ActionSheetButton>, cssClass?: string) {
		buttons.push({ text: 'Cancelar', role: 'cancel' });
		const actions = await this.actionCtrl.create({
			header: title,
			buttons,
			cssClass
		});
		await actions.present();
	}
	//#endregion

	//#region Logging
	/**
	 * Log local que verifica que si se logea o no.
	 * depende de  DataStorageService.showInterceptionLog (bool)
	 * @param msg mensaje base
	 * @param opcMsg mensajes opcionales
	 */
	log(msg: any, ...opcMsg: any[]) {
		if (verbose) console.log(msg, opcMsg);
	}
	//#endregion
}
