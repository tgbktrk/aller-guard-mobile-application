import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product, ProductModelFromJSON } from '../models/product';

export interface Allergen {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class AllergenService {

  private _allergens = new BehaviorSubject<Allergen[]>([]);

  allergens:string[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

   async getAllergens(barcode:string): Promise<Observable<Product>>{
    try {
      const product = this.httpClient.get(
     `${environment.baseUrl}/api/v2/product/${barcode}`
   ).pipe(map(response => ProductModelFromJSON(response).product));
    return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  removePrefix(strings: string[]): string[] {
    return strings.map(str => str.startsWith("en:") ? str.substring(3) : str);
}
 
}
