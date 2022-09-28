import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartDaily1Component } from './bar-chart-daily1.component';

describe('BarChartDaily1Component', () => {
  let component: BarChartDaily1Component;
  let fixture: ComponentFixture<BarChartDaily1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartDaily1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartDaily1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
