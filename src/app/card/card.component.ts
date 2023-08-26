import {Component, OnInit} from '@angular/core';
import {CardService, Users} from "./card.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.getUsers();
  }

  userList: Users[] = [];

  getUsers(): void {
    this.cardService.getUsers()
      .subscribe(users => {
        this.userList = users
        console.log(this.userList);
      })
  }
}
