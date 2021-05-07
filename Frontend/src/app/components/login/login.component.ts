import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDto } from '../../../../../Shared/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@Injectable()
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public loginForm: FormGroup | undefined;
  public isLoading : Boolean = false;
  constructor(private httpClient : HttpClient) {
    this.username = '';
    this.password = '';
   }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.isLoading = true;

    let user = new UserDto(this.username, this.password);

    this.httpClient.post('http://localhost:41005/user/add', user)
    .toPromise()
    .then((response) =>{
      alert('Success');
    })
    .catch((error) =>{
      alert(error);
    });

    this.isLoading = false;
  }
}
