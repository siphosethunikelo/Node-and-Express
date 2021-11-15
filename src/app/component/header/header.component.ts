import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AdminGuard } from 'src/app/guards/auth.guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  userData: any = {};
  adminBoolean: Observable<any>
  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public adminGuard: AdminGuard,
    private auth: AngularFireAuth,
    ) { 
      this.adminBoolean = this.userService.admin; // Put this inside your constructor
    }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
    })
  }

  userLogout(){
    this.adminGuard.logout()
  }
}
