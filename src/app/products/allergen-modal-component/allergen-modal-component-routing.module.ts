import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllergenModalComponentPage } from './allergen-modal-component.page';

const routes: Routes = [
  {
    path: '',
    component: AllergenModalComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllergenModalComponentPageRoutingModule {}
