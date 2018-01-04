import { Component, Input, OnInit } from '@angular/core';
import { SweetAlertService } from '../sweet-alert.service';
import { UserSettingsService } from '../../data/user-settings.service';
import { LocalStorageService } from '../../core/local-storage.service';

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

  constructor(private sweetAlertService: SweetAlertService,
              private userSettingsService: UserSettingsService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.iconURL = '../../../assets/icons/' + this.symbol.toLowerCase() + '.png';
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
      title: 'Update the number of coins owned',
      confirmButtonText: 'Submit',
      showCancelButton: true,
      input: 'text',
      inputPlaceholder: 'Enter a coin amount',
      inputClass: 'black-text'
    };

    const response: Promise<any> = this.sweetAlertService.swal(modalOptions);

    response.then((data) => {
      this.userSettingsService.currencyAmountsOwned[this.symbol.toUpperCase()] = +data;
      this.localStorageService.setItem('currencyAmountsOwned',
        JSON.stringify(this.userSettingsService.currencyAmountsOwned));
    }).catch((e) => {
    });

  }

  closeClick() {
    const keys = this.userSettingsService.currencyKeysToDisplay;
    const index = keys.indexOf(this.symbol);

    if (index > -1) {
      keys.splice(index, 1);
    }

    this.userSettingsService.updateCurrenciesToDisplay(keys);
  }

}
