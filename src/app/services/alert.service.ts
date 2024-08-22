import { Injectable } from '@angular/core';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController:AlertController
  ) { }

  async showAlert(
    subHeader:string,
    message?:string,
    // allergensMessage: string,
     color: string = 'primary'
    ) {
    const alert = await this.alertController.create({
      header: 'Warning',
      //subHeader: new IonicSafeString('This product contains at least one of your allergens!'),
      subHeader: subHeader,
      message: new IonicSafeString(message),
      buttons: ['OK'],
      cssClass: color === 'danger' ? 'alert-danger' : ''
    });
    await alert.present();
  }
}
