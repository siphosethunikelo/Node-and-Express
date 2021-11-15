import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  User : any =[]
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  // get all users
  loadUsers(){
    return this.userService.getUsers().subscribe((data: {}) => {
      this.User = data
    })
  }

  getNumUsers(numberUser : any){
    return this.userService.getUsers().subscribe((data: {}) => {
      this.User = data
      numberUser = this.User.length;
    })
    
    
  }

  // Delete User
  deleteUser(id: string) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.userService.deleteUser(id).subscribe(data => {
        this.loadUsers()
      })
    }
  } 
}
