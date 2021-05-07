import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDto } from '../../../../../Shared/user.dto';
import { AuthenticationService } from '../../services/authentication.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@Injectable()
export class LoginComponent implements OnInit {

  public username: string | undefined;
  public password: string | undefined;
  public loginForm: FormGroup | undefined;
  public isLoading : Boolean = false;
  constructor(private httpClient : HttpClient,
                       private authenticationService :  AuthenticationService) {

                       }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.isLoading = true;
    let user = new UserDto(this.username || "", this.password || "");
    this.authenticationService.login(user)
    .toPromise()
    .then((response) =>{
      alert('Success');
    })
    .catch((error) =>{
      alert('Error');
    });

    this.isLoading = false;
  }
}
