import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  userData : any = {};

  constructor( 
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
    })
  }

    // Update user data
    updateUser() {
      if(window.confirm('Are you sure, you want to update?')){
        this.userService.updateUser(this.id, this.userData).subscribe(data => {
          this.router.navigate(['/user-list'])
        })
      }
    }
}
