import { Component } from '@angular/core';
import { PageSection } from 'src/Interfaces/page-skeleton-module';
import { PAGE_SECTIONS } from './page-skeleton-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})
export class PageSkeletonComponent{
  pages: PageSection[] = PAGE_SECTIONS;
  
  constructor(
    private router: Router,
  ){}

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
