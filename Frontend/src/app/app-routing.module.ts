import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './session-helpers/auth.guard'
const routes: Routes = [ { path: '',  component: HomeComponent, canActivate: [AuthGuard] },
                                          { path: 'register', component: RegisterComponent},
                                          { path: 'home', component:HomeComponent },
                                          { path: 'login', component:LoginComponent},
                                          { path: "**", redirectTo:"" }
                                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
