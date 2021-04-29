import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask'

import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
     LoginComponent],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // TableModule,
    ButtonModule,
    InputMaskModule,
     ],
    
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

