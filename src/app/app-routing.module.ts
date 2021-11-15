import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserListComponent} from './component/user-list/user-list.component';
import {UserEditComponent } from './component/user-edit/user-edit.component';

import { UserSkillsComponent } from './component/user-skills/user-skills.component';
import { UserSkillsEditComponent } from './component/user-skills-edit/user-skills-edit.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';

import {LoginComponent} from './component/login/login.component'

import { AddUserComponent } from './component/add-user/add-user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HeaderComponent } from './component/header/header.component';

import {VisitorComponent} from './component/visitor/visitor.component';

import { AdminGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: 'welcome' , pathMatch: 'full'},
  { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard] },
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'add-admin-user', component: UserSkillsComponent},
  {path: 'user-edit-skills/:id', component: UserSkillsEditComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'welcome', component: AddUserComponent},
  {path: 'add-skill/:id', component: AddSkillComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'developer/:id', component: VisitorComponent},
  {path:'header', component: HeaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
