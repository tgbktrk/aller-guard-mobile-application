import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserModel } from '../models/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private firestore: AngularFirestore
  ) { }
  
  private usersCollection = this.firestore.collection<UserModel>('users');
  private loggedInUser: UserModel = null;

  setUser(user: UserModel) {
    this.loggedInUser = user;
    this.clearUser();
    localStorage.setItem('user', JSON.stringify(user)); // kullanıcı bilgisini localStorage'da saklama
  }

  getUserFromLocale() {
    if(this.loggedInUser == null && firebase.auth().currentUser != null){
      const localUser = JSON.parse(localStorage.getItem('user'));
      if(localUser == null){
        console.log('local User is not found');
        return null;
      }
      this.loggedInUser = localUser;
      console.log('getfromlocale : ', this.loggedInUser);
      return this.loggedInUser;
    }
    if(firebase.auth().currentUser == null){
      var guestUser:UserModel = {
        id:'',
        fullName:'',
        email:'',
        password:'',
        allergens:[]
      };
      this.loggedInUser = guestUser;
      return this.loggedInUser;
    }
    return this.loggedInUser;
  }

  clearUser() {
    this.loggedInUser = null;
    localStorage.removeItem('user');
  }

  async getUser(id: string): Promise<UserModel> {
    const response = await this.usersCollection.doc<UserModel>(id).get().toPromise();
    return response.data() as UserModel;
  }

  addUser(user: UserModel): Boolean{
    try {
      this.usersCollection.add(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUser(user: UserModel): Promise<Boolean> {
    try {
     await this.usersCollection.doc(user.id).update(user);
     this.clearUser();
     this.setUser(user);
      return true;
    } catch (error) {
      console.error('Error updating user: ', error);
      return false;
    }
  }  

}