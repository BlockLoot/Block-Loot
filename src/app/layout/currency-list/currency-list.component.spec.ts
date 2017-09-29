import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListComponent } from './currency-list.component';
import { LayoutModule } from '../layout.module';
import { CurrencyTileComponent } from '../currency-tile/currency-tile.component';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [ LayoutModule ],
      declarations: [ CurrencyListComponent, CurrencyTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
