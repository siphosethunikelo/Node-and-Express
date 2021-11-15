import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) { }
  canActivate(){
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (authState) { // check are user is logged in
          const token = await authState.getIdTokenResult()
          console.log(token.claims)
          if (token.claims.admin) { // check claims
            this.router.navigate([''])
            return false
          } else {
            return true
          }
        } else {
          this.router.navigate(['/user-list'])
          return false
        }
      }),
    )

  }
  
}
