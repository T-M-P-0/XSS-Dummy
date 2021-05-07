import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


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
    console.log("True");
    console.log(this.username);
    console.log(this.password);
    this.sleep(5000);
    console.log("false");

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
