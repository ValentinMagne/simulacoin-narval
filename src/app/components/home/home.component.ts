import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser$ = this.userService.currentUser$;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
  }

}
