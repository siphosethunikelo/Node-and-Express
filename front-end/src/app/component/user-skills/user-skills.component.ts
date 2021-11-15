import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss']
})
export class UserSkillsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  Skills : any = [];

  constructor(
    public userService : UserService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadSkills()
  }

   // Get employees list
   loadSkills() {
    return this.userService.getSkills(this.id).subscribe((data: {}) => {
      this.Skills = data;
    })
  }

  // Delete skills
  deleteSkills(id: any) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.userService.deleteSkill(this.id).subscribe(data => {
        this.loadSkills()
      })
    }
  }  
}
