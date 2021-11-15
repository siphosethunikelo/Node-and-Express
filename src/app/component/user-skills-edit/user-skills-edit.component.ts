import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-skills-edit',
  templateUrl: './user-skills-edit.component.html',
  styleUrls: ['./user-skills-edit.component.scss']
})
export class UserSkillsEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  skillDetails : any = {};
  userData : any = {};

  user_id = this.skillDetails.id;

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.userService.getSkills(this.id).subscribe((data: {}) =>{
      this.skillDetails = data
    })
    // this.userService.getUser(this.user_id).subscribe((data: {}) =>{
    //   this.userData = data
    // })
    // console.log('this is the id '+this.userData.id)
  }

  // Update skills data
  updateSkill() {
    if(window.confirm('Are you sure, you want to update?')){
      this.userService.updateSkills(this.id, this.skillDetails).subscribe(data => {
        // this.router.navigate(['/profile/'+this.user_id])
      })
    }
  }
}
