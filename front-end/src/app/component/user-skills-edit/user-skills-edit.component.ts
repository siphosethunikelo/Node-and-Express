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

  skillData : any = {};
  userData : any = {};

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.userService.getSkills(this.id).subscribe((data: {}) =>{
      this.skillData = data
    })

    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
    })
  }

  // Update skills data
  updateSkills() {
    if(window.confirm('Are you sure, you want to update?')){
      this.userService.updateSkills(this.id, this.skillData).subscribe(data => {
        this.router.navigate(['/user-skills/:id'])
      })
    }
  }
}
