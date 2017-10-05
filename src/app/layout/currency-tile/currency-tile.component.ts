import { Component, Input, OnInit } from '@angular/core';
import { COIN_URLS } from '../../data/icon-urls.constants';
import { SweetAlertService } from '../sweet-alert.service';

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

  constructor(private sweetAlertService: SweetAlertService) {
  }

  ngOnInit() {
    this.iconURL = COIN_URLS[this.symbol.toUpperCase()];
  }

  get coinValue() {
    const value = +this.value;
    return value.toFixed(2);
  }

  get valueOfTotalOwned() {
    const val = +this.value * +this.amountOwned;
    return val.toFixed(2);
  }

  swal() {
    const modalOptions = {
      html: `Can we update your shit?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    };
    
    const response: Promise<any> = this.sweetAlertService.confirm(modalOptions);

    response.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e);
    });

  }

}
