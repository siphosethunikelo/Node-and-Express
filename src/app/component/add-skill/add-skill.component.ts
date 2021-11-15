import { Component, OnInit, Input } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  userData : any = {};
  Skills : any = {}

  @Input() skillDetails = { developing: '', duration: '', rating: '', lastUsed: '', name: ''}
  constructor(
    public userService: UserService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
    })
  }
  
  // Get skills list
  loadSkills() {
    return this.userService.getSkills(this.id).subscribe((data: {}) => {
      this.Skills = data;
      console.log(this.Skills)
    })
  }

  createSkill() {
    this.userService.createSkill(this.id, this.skillDetails).subscribe(data => {
      this.loadSkills()
    })
  }

}
