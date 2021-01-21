import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../models/users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('add-user');
    this.buildCreateUserForm();
  }

  buildCreateUserForm() {
    this.createUserForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  userCreateFormSubmission() {

    if (!this.createUserForm.valid) {
      return;
    }
    const user = this.createUserForm.value as Users;
    this.userService.createUser(user)
      .subscribe((res) => {
        if (res.createdUser) {
          this.router.navigate(['/users/users'])
        }
      });
  }

  formInputIsRequired(formInput: string): boolean {
    if (this.createUserForm.controls[formInput]) {
      if (this.createUserForm.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }


}
