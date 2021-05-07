import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { UserDto } from '../../../../Shared/user.dto'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<UserDto>;
    public currentUser: Observable<UserDto>;
  constructor(private httpClient : HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<UserDto>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDto {
    return this.currentUserSubject.value;
  }


  login(user : UserDto) {
    alert("GG");
    return this.httpClient.post('http://localhost:41005/user/authenticate', user)
        .pipe(
          map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          let userData = user as UserDto;
          this.currentUserSubject.next(userData);
          return user;
        })
      );
  }

    logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new UserDto("",""));
  }
}
