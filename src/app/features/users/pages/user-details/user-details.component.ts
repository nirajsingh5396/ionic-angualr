import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../../models/users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

  user$: Observable<Users>;

  constructor(
    private activedRoute: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    const userName = this.activedRoute.snapshot.paramMap.get('id');
    console.log(userName);
    this.user$ = this.userService.getUserByUserName(userName)
  }






}
