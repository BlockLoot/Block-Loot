import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHeatmapComponent } from './coin-heatmap.component';

describe('CoinHeatmapComponent', () => {
  let component: CoinHeatmapComponent;
  let fixture: ComponentFixture<CoinHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
