import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserModel } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: UserModel;

  constructor(
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.user = this.userService.getUserFromLocale();
    const userId = (await this.afAuth.currentUser).uid;
  }

}
