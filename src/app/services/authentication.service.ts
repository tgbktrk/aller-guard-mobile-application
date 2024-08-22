import { Injectable, inject } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import 'firebase/firestore';
import { Allergen } from './allergen.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  errorMessage: string = '';
  allergens: Allergen[] = [];

  constructor(
    private ngFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) { }

  async registerUser(user: UserModel): Promise<firebase.auth.UserCredential>{
    try {
     const result = await this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password);
     return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
    
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async loginUser(email: string, password: string){
    try {
      await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      this.presentToast('Login successful');
      return true;
    } catch (error) {
    console.log(error);
    this.presentToast('Check your e-mail address or password!');
    return false;
 }
}

async setUserLoginTimestamp(userId: string) {
  const userRef = firebase.firestore().collection('users').doc(userId);
  await userRef.set({
    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

async addAllergen(allergen: string): Promise<void> {
  const user = await this.ngFireAuth.currentUser;
  if (user) {
    const userId = user.uid;
    const userRef = this.firestore.collection('users').doc(userId);
    try {
      await userRef.update({
        allergens: firebase.firestore.FieldValue.arrayUnion(allergen)
      });
      console.log('Allergen added successfully.');
    } catch (error) {
      console.error('Error adding allergen:', error);
    }
  } else {
    console.error('No user logged in.');
  }
}

  async getUserAllergens(): Promise<string[]> {
    const user = await this.ngFireAuth.currentUser;
    if (user) {
      try {
        const userDoc = await this.firestore.collection('users').doc(user.uid).ref.get();
        if (userDoc.exists) {
          console.log('user found  :');
          // console.log(userDoc.data.);
          // const data = userDoc.data() as { allergens?: string[] } | undefined;
          // return data?.allergens || [];
        } else {
          console.error('No user document found.');
          return [];
        }
      } catch (error) {
        console.error('Error fetching allergens:', error);
        return [];
      }
    } else {
      console.error('No user logged in.');
      return [];
    }
  }
  
  async resetPassword(email: string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    
  }

  async getUserData(uid: string): Promise<UserModel | undefined>{
    const userRef = this.firestore.collection('users').doc(uid);
    const doc = await userRef.get().toPromise();
    return doc.data() as UserModel;
  }

  getCurrentUser(): Observable<any> {
    return this.ngFireAuth.authState;
  }
  
}