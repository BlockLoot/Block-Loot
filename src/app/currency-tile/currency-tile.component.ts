import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-tile',
  templateUrl: './currency-tile.component.html',
  styleUrls: ['./currency-tile.component.scss']
})
export class CurrencyTileComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
