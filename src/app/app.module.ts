import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { PageSkeletonComponent } from './common/page-skeleton/page-skeleton.component';
import { StartPageComponent } from './common/start-page/start-page.component';
import {MatButtonModule} from '@angular/material/button';
import { EntrancePagesComponent } from './common/entrance-pages/entrance-pages.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SignInUpComponent } from './common/entrance-pages/sign-in-up/sign-in-up.component';
import { ForgotPasswordComponent } from './common/entrance-pages/forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { path: '', 
    redirectTo: 'start', 
    pathMatch: 'full',
  },
  { path: 'start', component: StartPageComponent },
  { path: 'login', 
    component: EntrancePagesComponent, 
    children: [
      {path:'', component: SignInUpComponent},
      {path:'renew-password', component: ForgotPasswordComponent},
    ] 
  },
  { path: 'pulpit', component: PageSkeletonComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PageSkeletonComponent,
    StartPageComponent,
    EntrancePagesComponent,
    SignInUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    BrowserAnimationsModule, 
    NgbModule, 
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
