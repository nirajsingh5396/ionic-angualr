import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignInContext } from '../models/sign-in.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  authSignInForm: FormGroup;
  isShowErrorMessage: boolean = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildSigninForm();
  }

  buildSigninForm() {
    this.authSignInForm = this.formBuilder.group({
      userId: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  authSignFormSubmission() {

    if (!this.authSignInForm.valid) {
      return;
    }
    const signnContext = this.authSignInForm.value as SignInContext;
    this.authService.signIn(signnContext)
      .subscribe((signInContextRes) => {
        if (signInContextRes.authenticated) {
          this.router.navigate(['/users'])
        } else {
          this.isShowErrorMessage = true;
          this.errorMessage = signInContextRes.message;
        }
      });
  }

  formInputIsRequired(formInput: string): boolean {
    if (this.authSignInForm.controls[formInput]) {
      if (this.authSignInForm.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }


}
