import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { Tab1Page } from './tab1/tab1.page';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./pages/auth-screens/auth-screen/auth-screen.module').then( m => m.AuthScreenPageModule)
  },
  {
    path: 'auth-screen',
    loadChildren: () => import('./pages/auth-screens/auth-screen/auth-screen.module').then( m => m.AuthScreenPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'alert',
    loadChildren: () => import('./pages/alert/alert.module').then( m => m.AlertPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'allergen-modal-component',
    loadChildren: () => import('./products/allergen-modal-component/allergen-modal-component.module').then( m => m.AllergenModalComponentPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
