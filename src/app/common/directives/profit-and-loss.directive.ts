import { CurrencyPipe } from "@angular/common";
import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({selector: '[appProfitAndLoss]'})
export class ProfitAndLossDirective implements OnChanges {

  @Input()
  public value: number | undefined;

  @HostBinding('class')
  private className: string;


  constructor(private readonly currencyPipe: CurrencyPipe, private readonly hostElement: ElementRef) {
    this.className = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.value === undefined) {
      return;
    }
    if (this.value > 0) {
      this.className = 'profit';
    } else if (this.value < 0) {
      this.className = 'loss';
    }
    this.hostElement.nativeElement.innerText = this.currencyPipe.transform(this.value);
  }
}
