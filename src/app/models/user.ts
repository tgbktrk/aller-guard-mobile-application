import { Allergens } from "../products/allergens";

export interface UserModel {
  id:string;
  fullName: string;
  email: string;
  password: string;
  allergens?: Allergens[];
}

