import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  user: UserModel;
  registerForm: FormGroup;
  type = true;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService, 
    private router: Router,
    private firestore: AngularFirestore,
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email,Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*")]],
        fullName: ['', Validators.required]
    });
  }

  get errorControl(){
    return this.registerForm?.controls;
  }

  async signUp(){
    if(this.registerForm.valid){
      const loading = await this.loadingCtrl.create();
      await loading.present();
      try{
        const email = this.registerForm.value.email;
        const password = this.registerForm.value.password;
        const fullName = this.registerForm.value.fullName;
        this.user = {
          id:'',
          email:email,
          password:password,
          fullName:fullName,
          allergens:[],
        };
      const userCredential = await this.authService.registerUser(this.user);
      console.log('userCredential : ' + userCredential);
      
      if(userCredential.user.uid != null){
        await this.firestore.collection('users').doc(userCredential.user?.uid).set({
          id:userCredential.user?.uid,
          email: email,
          fullName: fullName,
          password: password,
          allergens:[]
        });
        this.user.id = userCredential.user?.uid;
        this.userService.setUser(this.user);
        loading.dismiss()
        this.router.navigate(['/tabs/tab1'])
      } else{
        loading.dismiss()
        console.log('provide correct values')
      }
    }
    catch (error) {
      console.error(error);
      loading.dismiss();
    } 
  } else { 
    console.log('Form is not valid');
  }
  }

  changeType(){
    this.type = !this.type;
  }

}