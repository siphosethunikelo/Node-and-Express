import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() userDetails = { name: '', email: '', password: 0, surname: '', username: '', age: 0, admin: false }
  constructor(
    public userService: UserService, 
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  addUser() {
    this.userService.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(['/user-list'])
    })
  }
}
