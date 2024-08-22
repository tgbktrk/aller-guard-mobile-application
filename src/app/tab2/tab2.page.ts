import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UserService } from '../services/user.service';
import { Allergens } from '../products/allergens';
import { AllergenModalComponentPage } from '../products/allergen-modal-component/allergen-modal-component.page';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit, ViewWillEnter{
  
  userAllergens: Allergens[] = [];

  constructor(
    private userService: UserService,
    private alertService:AlertService,
    private modalController: ModalController
  ) {}

  ngOnInit(){
    console.log('tab2 ng on init is working');
  }


  ionViewWillEnter() {
    console.log('tab2 ion view will enter is working');
    const userAllergens = this.userService.getUserFromLocale().allergens;
    this.userAllergens = userAllergens;
  }

  async openAllergenModal() {
    if(this.userService.getUserFromLocale().id == ''){
      this.alertService.showAlert(
        'You are trying to add an allergen without an account.',
        'Please sign up first!'
      );
      return;
    };
    const modal = await this.modalController.create({
      component: AllergenModalComponentPage,
      componentProps: {
        selectedAllergens:this.userAllergens.slice()
      }
    });

    modal.onDidDismiss().then((allergensEvent: OverlayEventDetail<Allergens[]>) => {
      if (allergensEvent.data != null) {
        this.userAllergens = allergensEvent.data.slice(); // Güncel veriyi geri al
      }
    });
    return await modal.present();
  }

  async removeAllergen(selectedAllergen: Allergens){
  const loggedInUser = this.userService.getUserFromLocale();
  const index = loggedInUser.allergens.indexOf(selectedAllergen);
  if (index > -1) {
    loggedInUser.allergens.splice(index, 1);
    await this.userService.updateUser(loggedInUser);

  } else {
    console.log('allergen not found');
  }
}

}