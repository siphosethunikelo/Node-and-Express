import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

// Forms module
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './guards/auth.guard';

// Components
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserSkillsComponent } from './component/user-skills/user-skills.component';
import { UserSkillsEditComponent } from './component/user-skills-edit/user-skills-edit.component';
import { LoginComponent } from './component/login/login.component';
import { environment } from 'src/environments/environment';
import { AddUserComponent } from './component/add-user/add-user.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';
import { AboutComponent } from './component/about/about.component';
import { RegistrationComponent } from './component/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    UserSkillsComponent,
    UserSkillsEditComponent,
    LoginComponent,
    AddUserComponent,
    AddSkillComponent,
    AboutComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
