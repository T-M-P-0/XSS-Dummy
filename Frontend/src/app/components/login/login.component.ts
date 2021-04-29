import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserDto } from '../../../../../Shared/user.dto';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export  class LoginComponent implements OnInit {
  private returnUrl : string | undefined;
  public isSubmitted : boolean = false;
  public isLoading : boolean  = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public loginForm : FormGroup
  ) {
    if(authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get userLoginForm() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const user: UserDto = new UserDto(
      this.userLoginForm.username.value,
      this.userLoginForm.password.value
    );
    this.authenticationService
      .login(user)
      .pipe(first())
      .subscribe(
        (data) => {
          alert('loging in');
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          // this.alertService.error(error);
          alert("error"),
          this.isLoading = false;
        }
      );
  }
}


