import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminGuard } from 'src/app/guards/auth.guard';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  userData : any = {};
  adminBoolean: Observable<any>
  constructor( 
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public adminGuard: AdminGuard,
    private auth: AngularFireAuth,) {
      this.adminBoolean = this.userService.admin; // Put this inside your constructor
     }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
    })
  }

    // Update user data
    updateUser() {
        this.userService.updateUser(this.id, this.userData).subscribe(data => {
          this.router.navigate(['/profile/'+this.id])
        })
    }
}
