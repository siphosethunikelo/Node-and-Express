import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Auth } from '../interfaces/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  login(data: Auth): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(data.email, data.password);
  }

}
