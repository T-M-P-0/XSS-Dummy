import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { RegistrationService } from '../../services/registration.service';
import { UserDto } from '../../../../../Shared/user.dto';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    public isLoading = false;
    public isSubmitted = false;
    public username : string | undefined;
    public password : string | undefined;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private registrationService: RegistrationService
    ) { 
    }

    ngOnInit() {
    }


    onSubmit() {
        this.isSubmitted = true;

        // reset alerts on submit
        this.alertService.clear();

        this.isLoading = true;
        var newUser = new UserDto(this.username || "" ,  this.password || "");
        this.registrationService.register(newUser);
    }

    switchToLogin(){
        this.router.navigate(['login']);

    }
}