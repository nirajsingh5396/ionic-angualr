import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListOfUserComponent } from './pages/list-of-user/list-of-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: ListOfUserComponent },
      { path: 'create', component: AddUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: ':id', component: UserDetailsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule { }
