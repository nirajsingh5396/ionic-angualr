import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListOfUserComponent } from './pages/list-of-user/list-of-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    SharedModule
  ],
  declarations: [
    UsersPage,
    ListOfUserComponent,
    AddUserComponent,
    UserDetailsComponent
  ]
})
export class UsersPageModule { }
