import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    const userName = this.activedRoute.snapshot.paramMap.get('id');
    this.getUseryUserName(userName)
  }

  getUseryUserName(userName: string) {
    this.userService.getUserByUserName(userName)
      .subscribe(user => {
        this.user = user;
      }, err => console.log(err));
  }

  updateUser(user: Users) {
    this.userService.updateUser(user)
      .subscribe(res => {
        if (res.updatedUser) {
          this.router.navigate(['/users', user.username])
        }
      },
        (err) => console.log(err));
  }

}
