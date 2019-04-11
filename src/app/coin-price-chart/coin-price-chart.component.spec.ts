import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinPriceChartComponent } from './coin-price-chart.component';

describe('CoinPriceChartComponent', () => {
  let component: CoinPriceChartComponent;
  let fixture: ComponentFixture<CoinPriceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinPriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
