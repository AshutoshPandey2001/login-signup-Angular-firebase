import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartMonthly1Component } from './bar-chart-monthly1.component';

describe('BarChartMonthly1Component', () => {
  let component: BarChartMonthly1Component;
  let fixture: ComponentFixture<BarChartMonthly1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartMonthly1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartMonthly1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
