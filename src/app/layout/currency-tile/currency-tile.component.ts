import { Component, Input, OnInit } from '@angular/core';
import { COIN_URLS } from '../../data/icon-urls.constants';

@Component({
  selector: 'app-currency-tile',
  templateUrl: './currency-tile.component.html',
  styleUrls: ['./currency-tile.component.scss']
})
export class CurrencyTileComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() symbol: string;
  @Input() amountOwned: number;
  iconURL: string;

  constructor() {
  }

  ngOnInit() {
    this.iconURL = COIN_URLS[this.symbol.toUpperCase()];
  }

  get formattedValue() {
    const val = +this.value * +this.amountOwned;
    return val.toFixed(2);
  }

}
