import { Component, OnInit } from '@angular/core';

import { ErrorStoreService } from '../stores/error-store.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public errorStore: ErrorStoreService) {
  }

  ngOnInit(): void {
  }

}
