import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { BuyDialogData } from "../../models/buy-dialog-data";

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss']
})
export class BuyDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BuyDialogData,
              private readonly dialogRef: MatDialogRef<BuyDialogComponent>) {
  }
}
