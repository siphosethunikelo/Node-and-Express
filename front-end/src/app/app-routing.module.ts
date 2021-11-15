import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserListComponent} from './component/user-list/user-list.component';
import {UserEditComponent } from './component/user-edit/user-edit.component';

import { UserSkillsComponent } from './component/user-skills/user-skills.component';
import { UserSkillsEditComponent } from './component/user-skills-edit/user-skills-edit.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';

import {LoginComponent} from './component/login/login.component'

import { AddUserComponent } from './component/add-user/add-user.component';
import { AboutComponent } from './component/about/about.component';



import { AdminGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: 'user-list' , pathMatch: 'full'},
  { path: 'user-list', component: UserListComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'user-skills/:id', component: UserSkillsComponent},
  {path: 'user-edit-skills/:id', component: UserSkillsEditComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-skill', component: AddSkillComponent},
  {path: 'about', component: AboutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
