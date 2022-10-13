import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
import Moralis from 'moralis-v1';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);
  isProfileComplete$ = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.initializeMoraslis();
  }

  initializeMoraslis() {
    const serverUrl = environment.MORALIS_DAPP_SERVER_URL;
    const appId = environment.MORALIS_APP_ID;
    Moralis.start({ serverUrl, appId });
  }

  // if profile is complete, then go to home page
  // if profile is incomplete, then go to setup-profile page
  sampleLogIn() {
    this.isAuthenticated$.next(true);
    // this.router.navigate(['setup-profile']);

    // for testing purposes
    this.isProfileComplete$.next(true);
    this.router.navigate(['']);
  }

  sampleLogOut() {
    this.isAuthenticated$.next(false);
    this.isProfileComplete$.next(false);
    this.router.navigate(['login']);
  }

  async loginWithMetamask() {
    const customSigningMsg = 'Custom Message Here';

    const authResponse = await Moralis.authenticate({
      signingMessage: customSigningMsg,
    });

    console.log('AuthResponse:', authResponse);

    this.isAuthenticated$.next(true);
    this.isProfileComplete$.next(true);
    this.router.navigate(['']);
  }

  async logOut() {
    await Moralis.User.logOut();
    this.router.navigate(['login']);
  }

  signUp() {
    this.isAuthenticated$.next(true);
    this.router.navigate(['']);
  }

  isUserHandleUnique(handle: string) {
    // console.log('Checking input: ' + handle);

    return new Promise((resolve) =>
      setTimeout(() => {
        if (handle === 'sample01') {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 1500)
    );

    // if (handle === 'sample01') {
    //   return false;
    // } else {
    //   return true;
    // }
  }

  submitUserHandleForm() {
    this.isProfileComplete$.next(true);
    this.router.navigate(['']);
  }
}
