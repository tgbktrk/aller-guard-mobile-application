import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewWillEnter {

  user: any;
  isButtonVisible:boolean;

  constructor(
    private authService: AuthenticationService,
    private userService:UserService,
    private router: Router
  ) {
    this.user = authService.getProfile();
  }

  ngOnInit(){
    console.log('tab3 ng on init is working');
  }

  ionViewWillEnter() {
    console.log('tab3 ng view will enter is working');
    if(this.userService.getUserFromLocale().id == ''){
      this.isButtonVisible = false;
      return;
    }
    this.isButtonVisible = true;
  }

  goAccount(){
    this.router.navigate(['/profile']);
  }

  async signout(){
    this.authService.signOut().then(async () => {
      this.userService.clearUser();
      await this.router.navigate(['auth-screen']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async signUp(){
    await this.router.navigate(['auth-screen']);
  }

}
