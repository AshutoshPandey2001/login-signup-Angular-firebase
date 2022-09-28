import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartYearly1Component } from './bar-chart-yearly1.component';

describe('BarChartYearly1Component', () => {
  let component: BarChartYearly1Component;
  let fixture: ComponentFixture<BarChartYearly1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartYearly1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartYearly1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
