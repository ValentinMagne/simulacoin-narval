import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { BuyDialogData } from "../../models/buy-dialog-data";

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss']
})
export class BuyDialogComponent {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: BuyDialogData,
              private readonly dialogRef: MatDialogRef<BuyDialogComponent>) {
    this.form = new FormGroup({
      quantity: new FormControl(data.quantity, [Validators.required]),
    });
  }
}
