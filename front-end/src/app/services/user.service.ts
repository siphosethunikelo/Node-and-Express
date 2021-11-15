import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {User} from '../user'
import {Skill} from '../skills'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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
    return this.http.get<Skill>(this.apiURL + '/user/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update skills
  updateSkills(id: string, skill: any): Observable<Skill> {
    return this.http.put<Skill>(this.apiURL + '/skills/' + id, JSON.stringify(skill), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createSkill(id: string, skill: any): Observable<Skill> {
    return this.http.post<Skill>(this.apiURL + 'skills'  + id, JSON.stringify(skill), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API delete() method => Delete User
   deleteSkill(id: string){
    return this.http.delete<Skill>(this.apiURL + '/skills/' + id, this.httpOptions)
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


