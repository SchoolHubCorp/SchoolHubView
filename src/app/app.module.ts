import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginToSchoolComponent } from './login-to-school/login-to-school.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginToSchoolComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
