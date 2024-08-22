import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllergenModalComponentPageRoutingModule } from './allergen-modal-component-routing.module';

import { AllergenModalComponentPage } from './allergen-modal-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllergenModalComponentPageRoutingModule
  ],
  declarations: [AllergenModalComponentPage]
})
export class AllergenModalComponentPageModule {}
