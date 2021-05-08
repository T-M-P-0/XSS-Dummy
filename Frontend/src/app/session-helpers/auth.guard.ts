import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
// This is the work of cornflourblue @ https://github.com/cornflourblue/angular-8-registration-login-example
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser.fullName);
        console.log(currentUser.token);
        console.log(Object.keys(currentUser).length);
        if (!(Object.keys(currentUser).length === 0)) {
            // authorised so return true
            return true;
        }

  
        // not logged in so redirect to login page with the return url

        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}