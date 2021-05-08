
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from '../../../../../Shared/user.dto';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@Injectable()
export class LoginComponent implements OnInit {
  private formBuilder: FormBuilder | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public isSubmitted: boolean = false;
  public loginForm: FormGroup;

  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      if (this.authenticationService.currentUserValue)
        this.router.navigate(['/']);

      this.loginForm = new FormGroup({});
    }

  ngOnInit(): void {
    
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.isLoading = true;
    let user = new UserDto(this.username || '', this.password || '');
    this.authenticationService
      .login(user)
      .toPromise()
      .then((response) => {
        alert('Success');
      })
      .catch((error) => {
        alert('Error');
      });

    this.isLoading = false;
  }
}
