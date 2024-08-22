import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Allergens } from '../allergens';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-allergen-modal-component',
  templateUrl: './allergen-modal-component.page.html',
  styleUrls: ['./allergen-modal-component.page.scss'],
})
export class AllergenModalComponentPage implements OnInit {
  @Input() selectedAllergens: Allergens[] = [];
   defaultItems: Allergens[] = [];
  @Output() saveAllergens = new EventEmitter<Allergens[]>();
  allergens = Object.values(Allergens);

  constructor(private modalController: ModalController,
    private userService: UserService,
    private ngFireAuth: AngularFireAuth
  ) { }

  dismissModal() {
    this.selectedAllergens = this.defaultItems.slice();
    console.log('dissmissed and sliced selectedAllergens :',this.selectedAllergens);
    this.modalController.dismiss();
  }

  async saveModal() {
    this.saveAllergens.emit(this.selectedAllergens);
    this.modalController.dismiss(
      this.selectedAllergens
      // Burada seçilen alerjenleri geri gönderiyoruz
    );
    await this.addAllergens(this.selectedAllergens);
    this.setChangedItems();
  }

  toggleAllergen(allergen: Allergens) {
    const index = this.selectedAllergens.indexOf(allergen);
    if (index > -1) {
      this.selectedAllergens.splice(index, 1);
      console.log('defaultItems :',this.defaultItems);
      console.log('selectedAllergens :',this.selectedAllergens);
    } else {
      this.selectedAllergens.push(allergen);
      console.log('defaultItems :',this.defaultItems);
      console.log('selectedAllergens :',this.selectedAllergens);
    }
  }

  isSelected(allergen: Allergens): boolean {
    return this.selectedAllergens.includes(allergen);
  }

  async addAllergens(selectedAllergens: Allergens[]){
     const currentUser = this.userService.getUserFromLocale();
     currentUser.allergens = selectedAllergens;
     console.log('currentUser : ', currentUser);
   await this.userService.updateUser(currentUser);
  }

  setChangedItems(){
    this.defaultItems = this.selectedAllergens.slice();

  }
  
  ngOnInit() {
    this.setChangedItems();
  }

}