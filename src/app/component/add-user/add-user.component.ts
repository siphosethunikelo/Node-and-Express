import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminGuard } from 'src/app/guards/auth.guard';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AyobaService } from 'src/app/services/ayoba.service';
// import {MicroApp} from '../../../../src/lib/mircoapp.js'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() userDetails = { name: '', email: '', password: '', surname: '', username: '', age: 0, admin: false, phone: "", address:"", git:"", facebook:"", title:"" }
  adminBoolean: Observable<any>
  Picture : any =[]
  User : any =[]
  clickedUser : any =[]
  name;
  id = this.User.id
  
  
  constructor(
    public userService: UserService, 
    public router: Router,
    public adminGuard: AdminGuard,
    public ayoba: AyobaService,
    private auth: AngularFireAuth,
  ) { 
    this.adminBoolean = this.userService.admin; // Put this inside your constructor
    this.timeOut();
  }

  jid = this.ayoba.getSelfJid() || 'nothing';
  ngOnInit(): void {
    this.loadPictures();
    this.loadUsers();
    // this.loadProfile();
  }

  addUser() {
    this.userService.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(['/login'])
    })
  }

  // get all Pictures
  loadPictures(){
    return this.userService.getPictures().subscribe((data: {}) => {
      this.Picture = data
    })
  }

  // get all users
  loadUsers(){
    return this.userService.getUsers().subscribe((data: any) => {
      this.User = data
    })
  }

  
  timeOut() {
    let count = 0;
    setInterval(() => {
      if (count === this.Picture.length) {
        count = 0;
      }
      this.name = this.Picture[count];
      count++;
    }, 2500);
  }

loadProfile(){
  return this.userService.getUser(this.name.id).subscribe((data: {}) =>{
    this.clickedUser = data
  console.log("this is the clickedID:" +this.name.id);
  this.router.navigate(['/profile/'+this.name.id])
  })
}
 

}
