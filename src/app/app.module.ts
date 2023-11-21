import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { PlanComponent } from './app-pages/plan/plan.component';
import { SubjectsComponent } from './app-pages/subjects/subjects.component';
import { MarksComponent } from './app-pages/marks/marks.component';
import { ClassesComponent } from './app-pages/classes/classes.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchingFieldComponent } from './common/searching-field/searching-field.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditClassComponent } from './app-pages/classes/edit-class/edit-class.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ResponseMessageDialogComponent } from './common/response-message-dialog/response-message-dialog.component';
import { StudentsTeachersComponent } from './app-pages/students-teachers/students-teachers.component';
import { AddTeacherComponent } from './app-pages/students-teachers/add-teacher/add-teacher.component';
import { AddLessonComponent } from './app-pages/subjects/add-lesson/add-lesson.component';

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
  { path: 'schoolhub', component: PageSkeletonComponent,
    children: [
      {path:'plan', component: PlanComponent},
      {path:'subjects', component: SubjectsComponent},
      {path:'marks', component: MarksComponent},
      {path:'classes', component: ClassesComponent},
      {path: 'class/:classCode', component: EditClassComponent},
      {path:'students', component: StudentsTeachersComponent},
      {path:'teachers', component: StudentsTeachersComponent},
    ] 
  }
];

const AngularMaterialsImports = [
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    PageSkeletonComponent,
    StartPageComponent,
    EntrancePagesComponent,
    SignInUpComponent,
    ForgotPasswordComponent,
    PlanComponent,
    SubjectsComponent,
    MarksComponent,
    ClassesComponent,
    SearchingFieldComponent,
    EditClassComponent,
    ResponseMessageDialogComponent,
    EditClassComponent,
    StudentsTeachersComponent,
    AddTeacherComponent,
    AddLessonComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    BrowserAnimationsModule, 
    NgbModule, 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...AngularMaterialsImports,
    JwtModule.forRoot({config: {
      tokenGetter: () => {return localStorage.getItem('access_token')},
      allowedDomains: ['localhost:4200'],
      disallowedRoutes: ['localhost:4200/api/Users/login']
    }}),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
