import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntrancePagesService } from './entrance-pages.service';

interface SelectLabel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entrance-pages',
  templateUrl: './entrance-pages.component.html',
  styleUrls: ['./entrance-pages.component.scss']
})
export class EntrancePagesComponent implements OnInit {
  selectedValue!: string;
  roles: SelectLabel[] = [];
  selectedRole: string = '';
  postData!: any;
  
  subscription: Subscription = new Subscription;

  constructor(
    private entrancePagesService: EntrancePagesService,
  ) {}
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData(): void {
    this.subscription.add(
        this.entrancePagesService.getSchoolInfo().subscribe((data: string[]) => {
          for (let i = 0; i < data.length; i++) {
            this.roles.push({
              viewValue: data[i],
              value: 'role-' + i
            })
          }
        })
    );
  }

  onSelectedValueChange(value: any) {
    this.entrancePagesService.emitChosenRole(value);
  }
}
