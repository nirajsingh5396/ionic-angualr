import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private userService: UsersService,
    private alertControler: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const userName = this.activedRoute.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUserByUserName(userName)
  }


  deleteHandler(userName: string) {
    this.userService.deleteUser(userName)
      .subscribe((res) => {
        if (res.isDeleted) {
          this.router.navigate(['/users'])
        }
      }, (err) => console.log(err));
  }


  alertConfirmationWindow(userName: string) {
    this.alertControler.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteHandler(userName);
          }
        }
      ]
    }).then(alert => alert.present());
  }




}
