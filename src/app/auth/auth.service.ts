import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SignInComponentRes, SignInContext } from './models/sign-in.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(signnContext: SignInContext): Observable<SignInComponentRes> {
    const SignInComponentRes: SignInComponentRes = {
      authenticatedUser: null,
      authenticated: false,
      tokon: null,
      message: null
    };
    if (signnContext.userId === 'demo' && signnContext.password === 'demo') {
      SignInComponentRes.authenticatedUser = 'demo';
      SignInComponentRes.authenticated = true;
      SignInComponentRes.tokon = '1ewqqqqweerrtyuuiopasdfghjklnvcxzdeegg6577hgdewwe27hdfyjdjuyeus',
        SignInComponentRes.message = 'login successful'
    } else if (signnContext.userId !== 'demo' && signnContext.password !== 'demo') {
      SignInComponentRes.message = 'User name and password is invalid';
    } else if (signnContext.userId !== 'demo') {
      SignInComponentRes.message = 'User id is invalid';
    } else if (signnContext.password !== 'demo') {
      SignInComponentRes.message = 'Password is invalid';
    }
    return of(SignInComponentRes);
  }


}
