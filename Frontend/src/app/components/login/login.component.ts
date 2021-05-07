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

  public username: string | undefined;
  public password: string | undefined;
  public loginForm: FormGroup | undefined;
  public isLoading : Boolean = false;
  constructor(private httpClient : HttpClient) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    this.isLoading = true;
    let user = new UserDto("Test", "Test");

    this.httpClient.post('http://localhost:41005/user/add', user.fullName)
    .toPromise()
    .then((response) =>{
      alert('Success');
    })
    .catch((error) =>{
      alert(error);
    });

    this.isLoading = false;
  }

private sleep(milliseconds : number) : void {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

}
