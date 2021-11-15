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

  @Input() skillDetails = { developing: false, duration: '', rating: 0, lastUsed: '00/00/0000', name: ''}
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
  

  createSkill() {
    this.userService.updateSkills(this.id, this.skillDetails).subscribe(data => {
      this.router.navigate(['/user-skills/:id'])
    })
  }
}
