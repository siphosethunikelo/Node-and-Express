import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminGuard } from 'src/app/guards/auth.guard';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss']
})
export class UserSkillsComponent implements OnInit {
  @Input() userDetails = { name: '', email: '', password: '', surname: '', username: '', age: 0, admin: false, phone: "", address:"", git:"", facebook:"", title:"" }
  adminBoolean: Observable<any>
  constructor(
    public userService: UserService, 
    public router: Router,
    public adminGuard: AdminGuard,
    private auth: AngularFireAuth,
  ) { 
    this.adminBoolean = this.userService.admin; // Put this inside your constructor
  }

  ngOnInit(): void {
  }

  addUser() {
    this.userService.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(['/user-list'])
    })
  }
}
