import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() guestForm!: FormGroup
  
  constructor(private router: Router, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.guestForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }

  login(data: Auth): void {
    this.auth.login(data).then((user) => {
      this.router.navigateByUrl('/user-list')
    }).catch((err) => {
      return err.message
    })
  }


}
