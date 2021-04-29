import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../../../../Shared/user.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDto>= new BehaviorSubject<UserDto>(new UserDto("", ""));
  private currentUser: Observable<UserDto> = new Observable<UserDto>();
  private readonly hostAddress: string = 'http://localhost:41005';

  constructor(private readonly httpClient: HttpClient) {
    const userData = localStorage.getItem('currentUser');
    if (userData == null){
      return;
    }
    
    const currUser : string = userData
    this.currentUserSubject = new BehaviorSubject<UserDto>(
      JSON.parse(currUser)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDto {
    return this.currentUserSubject.value;
  }

  login(user: UserDto) {
    return this.verifyUser(user).pipe(
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
    this.currentUserSubject.next(new UserDto("", ""));
  }

  private verifyUser(userDto: UserDto) {
    return this.httpClient.post(`${this.hostAddress}/user/verify`, {
      UserName: userDto.fullName,
      Password: userDto.password,
    });
  }

   // Adds an non existing user.
  private addUser(userDto : UserDto) {
    return this.httpClient.post(`${this.hostAddress}/user/add`, 
                                  { UserName: userDto.fullName, Password : userDto.password }
                                  );
  }
}
