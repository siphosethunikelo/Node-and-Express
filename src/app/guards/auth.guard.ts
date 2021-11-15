import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';
import {UserService} from '../../../src/app/services/user.service'
import { AyobaService } from '../services/ayoba.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router, public actRoute: ActivatedRoute, public userService: UserService, private ayoba: AyobaService) { }
  id = this.actRoute.snapshot.params['id'];
  currUser;
  canActivate(){
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (authState) { // check are user is logged in
          const token = await authState.getIdTokenResult()
          localStorage.setItem('user_id', token.claims.user_id)
          this.currUser = token.claims.user_id
          // this.checkJid(this.currUser).then(stat => {
          //   if(!stat) {
          //     const jid = this.ayoba.getSelfJid() || undefined;
          //     this.userService.updateUser(this.currUser,{'jid': jid}).toPromise().then(() => {
          //       console.log('User JID updated');
          //     })
          //   }
          // })
            if (!token.claims.admin) { // check claims
            this.router.navigate(['/profile/'+token.claims.user_id])
            console.log(token.claims.user_id)
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

  logout(){
    localStorage.removeItem('user_id');
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  // async checkJid(id:any): Promise<boolean> {
    
  //   const status = await this.userService.getUser(this.currUser).toPromise().then(user => {
  //     if(user.jid && user.jid != null && user.jid != undefined) {
  //       return true ;
        
        
  //     } else {
  //       return false
  //     }
  //   }).catch(() => {
  //     return false;
  //   })

  //   return status;
  // }
  
}
