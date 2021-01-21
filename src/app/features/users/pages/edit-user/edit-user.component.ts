import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../models/users.model';
import { UsersService } from '../../users.service';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  user: Users = null;

  constructor(
    private activedRoute: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    const userName = this.activedRoute.snapshot.paramMap.get('id');
    this.getUseryUserName(userName)
  }

  getUseryUserName(userName: string) {
    this.userService.getUserByUserName(userName)
      .subscribe(user => {
        this.user = user;
        console.log(user, 'edit-user')
      }, err => console.log(err));
  }

  updateUser(user: Users) {

  }

}
