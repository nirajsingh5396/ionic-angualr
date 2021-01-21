import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() user: Users;
  @Output() emitUser: EventEmitter<Users> = new EventEmitter<Users>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildCreateUserForm();
    this.updateValue();
  }

  buildCreateUserForm() {
    this.createUserForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  updateValue() {
    if (this.user) {
      this.createUserForm.setValue({
        name: this.user.name,
        username: this.user.username,
        email: this.user.email
      });
    }
  }

  userCreateFormSubmission() {

    if (!this.createUserForm.valid) {
      return;
    }
    const user = this.createUserForm.value as Users;
    this.userService.createUser(user)
      .subscribe((res) => {
        if (res.createdUser) {
          this.router.navigate(['/users'])
        }
      });
  }

  userUpdateFormSubmission() {
    if (!this.createUserForm.valid) {
      return;
    }
    const user = this.createUserForm.value as Users;
    this.emitUser.next(user);
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
