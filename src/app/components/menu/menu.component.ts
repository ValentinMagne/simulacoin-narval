import { Component, OnInit } from '@angular/core';

import { MenuStoreService } from "../../stores/menu-store.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public menuStore: MenuStoreService) { }

  ngOnInit(): void {
  }

}
