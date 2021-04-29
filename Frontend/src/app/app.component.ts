import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../../Shared/user.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public currentUser: UserDto = new UserDto("", "");
  title = 'Frontend';
  constructor(private router: Router) {}
  logout() {
    // this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
