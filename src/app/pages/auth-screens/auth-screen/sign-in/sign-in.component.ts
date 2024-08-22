import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {

  signinForm: FormGroup;
  type = true;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email,Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*")]]
    })
  }

  get errorControl(){
    return this.signinForm?.controls;
  }

  async signin(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.signinForm?.valid){
      const response =  await this.authService.loginUser(this.signinForm.value.email, this.signinForm.value.password);
      if(!response){
        loading.dismiss();
        console.log('Login failed');
      }
      else{
        const user = firebase.auth().currentUser;
        const loggedInUser = await this.userService.getUser(user.uid);
        console.log('loggedInUser :', loggedInUser);
        this.userService.setUser(loggedInUser);

        if (user) {
          await this.authService.setUserLoginTimestamp(user.uid);
        }
        loading.dismiss();
        console.log('Login successful');
        console.log(user.email);
        this.router.navigate(['/tabs/tab1']);
      }
    }
  }

  changeType(){
    this.type = !this.type;
  }

}

