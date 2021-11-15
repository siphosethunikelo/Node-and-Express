import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {User} from '../user'
import {Skill} from '../skills'
import {File} from '../file'
import { inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Define API
  apiURL = 'http://localhost:3000';
  
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { 
    this.afAuth.onAuthStateChanged(admin => {
    if (admin) {
      admin.getIdTokenResult().then(token => {
        return this.admin = token.claims.admin;
      }).catch(err => err.message);
    }
  });}

  admin: Observable<any>  

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }), responseType: 'text' as 'json'
  }  

  // HttpClient API get() method => Fetch Users list
  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API post() method => Create User
   createUser(user:any): Observable<User> {
    return this.http.post<User>(this.apiURL + '/register', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  


   // HttpClient API get() method => Fetch user
   getUser(id : string): Observable<User> {
    return this.http.get<User>(this.apiURL + '/user/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API get() method => Fetch skills
   getSkills(id : string): Observable<Skill> {
    return this.http.get<Skill>(this.apiURL + '/skills/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update skills
  updateSkills(skill_id: string, skill: any): Observable<Skill> {
    return this.http.put<Skill>(this.apiURL + '/skills/' + skill_id, JSON.stringify(skill), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createSkill(id: string, skill: any): Observable<Skill> {
    return this.http.post<Skill>(this.apiURL + '/skills/'  + id, JSON.stringify(skill), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API delete() method => Delete User
   deleteSkill(skill_id: string,){
    return this.http.delete<Skill>(this.apiURL + '/skills/' + skill_id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
    // HttpClient API put() method => Update user
    updateUser(id: string, user: any): Observable<User> {
      return this.http.put<User>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    // HttpClient API delete() method => Delete User
    deleteUser(id: string){
      return this.http.delete<User>(this.apiURL + '/delete/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    // Profile picture upload code
    storeURL(id:string,file:any): Observable<File>{
      return this.http.post<File>(this.apiURL + '/upload/' + id, JSON.stringify(file), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    // HttpClient API get() method => Fetch profile picture
   getProPic(id : string): Observable<File> {
    return this.http.get<File>(this.apiURL + '/picture/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API get() method => Fetch Picture list
   getPictures(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/pictures')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

 // Error handling 
 handleError(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}