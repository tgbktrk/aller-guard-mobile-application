import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AllergenService } from 'src/app/services/allergen.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user';
import { Allergens, mapStringToEnum } from '../products/allergens';
import { AlertService } from '../services/alert.service';
import { ViewWillEnter } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, ViewWillEnter{
  barcodeImage: string = 'assets/imgs/barcode.png';
  qrcodeImage: string = 'assets/imgs/qrcode.png';
  scannedResult: any;
  content_visibility = '';
  userId: string | null = null;
  allergenSub: Subscription;
  users: UserModel[] = [];
  allergen: string='';
  productAllergens: Allergens[];
  userAllergens: Allergens[];
  barcodes: Barcode[] = [];
  isSupported = false;
  barcodeSub!: Subscription;

  constructor(
    private allergenService: AllergenService,
    private userService: UserService,
    private alertService: AlertService,
    private alertController: AlertController,
    private router: Router
  ) { };
  
ngOnInit(): void {
  console.log('tab1 ng on init is working');
  BarcodeScanner.isSupported().then((result) => {
    this.isSupported = result.supported;
  });
}

ionViewWillEnter() {
  console.log('tab1 ion view will enter is working');
  this.userAllergens = this.userService.getUserFromLocale().allergens;
  console.log('user Alergens : ',this.userAllergens);
}

async scan(): Promise<void> {
  const granted = await this.requestPermissions();
  if (!granted) {
    this.presentAlert();
    return;
  }
  const { barcodes } = await BarcodeScanner.scan();
  this.barcodes = barcodes;
  console.log("barcodes raw value =");
  console.log(this.barcodes[0].rawValue);
  (await this.allergenService.getAllergens(this.barcodes[0].rawValue)).subscribe((product) => {
  const editedList = this.removePrefix(product.allergensHierarchy);
  console.log('edited list : ',editedList);
  const mappedAllergens = mapStringToEnum(editedList);
  console.log('alergen list : ',mappedAllergens);
  this.productAllergens = mappedAllergens;
  const isContain = this.containsAny(this.userAllergens, mappedAllergens);
  console.log('isContain : ', isContain);
  if(isContain){
    const commonElements = this.getCommonElements(this.userAllergens, mappedAllergens);
    console.log('common elements : ',commonElements);
    var allergensMessage: string = '';
    var allergensData: any = [];
    for (let index = 0; index < commonElements.length; index++) {
      const alergen = commonElements[index];
      allergensMessage = allergensMessage + alergen + ', ';
      allergensData.push(alergen);
    }
    allergensMessage = allergensData.join('<br/>');
    this.alertService.showAlert(
      'This product contains at least one of your allergens!',
      allergensMessage
    );
  }
  else{
    this.alertService.showAlert(
      'This product contains none one of your allergens!',
      'Please be careful and read the ingredients.'
    );
  }
})
}

async requestPermissions(): Promise<boolean> {
  const { camera } = await BarcodeScanner.requestPermissions();
  return camera === 'granted' || camera === 'limited';
}

async presentAlert(): Promise<void> {
  const alert = await this.alertController.create({
    header: 'Permission denied',
    message: 'Please grant camera permission to use the barcode scanner.',
    buttons: ['OK'],
  });
  await alert.present();
}

/*
  async testScan(){
   var nutella = '3017624010701';
   var movenpickCreme = '4011800103927';
   var pepsi = "4062139001620"
    this.scannedResult = movenpickCreme;
    console.info('result = ' + this.scannedResult);
    try {
     const res = await this.allergenService.getAllergens(this.scannedResult);
     res.subscribe((product) => {
        const editedList = this.removePrefix(product.allergensHierarchy);
        console.log('edited list :',editedList);
        const mappedAllergens = mapStringToEnum(editedList);
        console.log('alergen list :',mappedAllergens);
        this.productAllergens = mappedAllergens;
        const isContain = this.containsAny(this.userAllergens, mappedAllergens);
        console.log('isContain : ', isContain);
        if(isContain){
          const commonElements = this.getCommonElements(this.userAllergens, mappedAllergens);
          console.log('common elements : ',commonElements);
          var allergensMessage: string = '';
          for (let index = 0; index < commonElements.length; index++) {
            const alergen = commonElements[index];
            allergensMessage = allergensMessage + alergen + ', ';
          }
          this.alertService.showAlert(
            allergensMessage
          );
        }
      });
    } catch (error) {
      console.log(error);
  }
}
  */

removePrefix(strings: string[]): string[] {
  return strings.map(str => str.startsWith("en:") ? str.substring(3) : str);
}

containsAny(list1: string[], list2: string[]): boolean {
  return list2.some(item => list1.includes(item));
}

getCommonElements(list1: string[], list2: string[]): string[] {
  return list1.filter(item => list2.includes(item));
}

  public allergenAlert = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      this.router.navigate(['/tabs/tab1'])
      console.log('Alert confirmed');
    },
  },
  ];
  
  setResult(ev){
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}