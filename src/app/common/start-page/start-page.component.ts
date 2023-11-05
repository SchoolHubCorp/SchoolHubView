import { Component, OnDestroy, OnInit } from '@angular/core';
import { StartPageService } from './start-page.service';
import { SchoolDescription } from 'src/Interfaces/login-models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy {
  schoolData!: SchoolDescription;
  private subscription: Subscription = new Subscription;

  constructor(
    private startPageService: StartPageService,
    private router: Router
    ) {};

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadData(): void {
    this.subscription.add(
      this.startPageService.getSchoolInfo().subscribe(data => {
        this.schoolData = data;
      })
    );
  }

  on() {
    this.router.navigate(['/login/']);
  }
}
