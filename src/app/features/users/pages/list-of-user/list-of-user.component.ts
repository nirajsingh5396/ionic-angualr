import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-list-of-user',
  templateUrl: './list-of-user.component.html',
  styleUrls: ['./list-of-user.component.scss'],
})
export class ListOfUserComponent implements OnInit {
  title: string = 'You have not added user please add user below';
  searchText: string;
  users: Users[] = [];
  noUser: boolean = true;

  constructor(private userService: UsersService) { 
  }

  ngOnInit() {
  
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        if (users.length > 0) {
          this.users = users;
          this.noUser = false;
        }
      },
        (err) => console.log(err));
  }

}
