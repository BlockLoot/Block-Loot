import {Component, Input, OnInit} from '@angular/core';
import { Currency } from '../../shared/models/currency.model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  @Input() allCurrencies: Currency[];

  constructor() { }

  ngOnInit() {
  }

}
