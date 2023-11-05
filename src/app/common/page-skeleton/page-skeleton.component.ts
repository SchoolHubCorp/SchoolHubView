import { Component, OnInit } from '@angular/core';
import { PageSection } from 'src/Interfaces/page-skeleton-models';
import { PAGE_SECTIONS } from './page-skeleton-constants';
import { Router } from '@angular/router';
import { TokenCheckerService } from 'src/services/token-checker';

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss'],
})
export class PageSkeletonComponent implements OnInit{
  pages: PageSection[] = PAGE_SECTIONS;
  userRole!: string;
  
  constructor(
    private router: Router,
    private tokenCheckerService: TokenCheckerService,
  ){}

  ngOnInit(): void {
    this.userRole = this.tokenCheckerService.getAuthUserRole() as string;
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
