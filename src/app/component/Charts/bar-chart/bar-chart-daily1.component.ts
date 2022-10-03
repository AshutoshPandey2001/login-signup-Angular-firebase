import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart-daily1',
  templateUrl: './bar-chart-daily1.component.html',
  styleUrls: ['./bar-chart-daily1.component.scss'],
})
export class BarChartDaily1Component implements OnInit {
  chartdetail: any;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartDatadaily: ChartData<'bar'> = {
    labels: [
      'Monday',
      'Tuesday',
      'Wed',
      'Thrusday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // Weekly

  public barChartDataweekly: ChartData<'bar'> = {
    labels: ['week1', 'week2', 'week3', 'week4'],
    datasets: [
      { data: [99, 55, 83, 81, 56, 55, 54], label: 'Series A' },
      { data: [85, 88, 42, 95, 86, 75, 92], label: 'Series B' },
    ],
  };

  // Monthly

  public barChartDatamonthly: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [605, 589, 850, 891, 566, 525, 40], label: 'Series A' },
      { data: [328, 488, 406, 519, 860, 270, 906], label: 'Series B' },
    ],
  };
  constructor() {}

  ngOnInit(): void {
    this.filter('daily');
  }

  // event

  filter(type: string) {
    this.chartdetail = null;
    switch (type) {
      case 'daily':
        this.chartdetail = {
          labels: [
            'Monday',
            'Tuesday',
            'Wed',
            'Thrusday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          datasets: [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
          ],
        };
        break;
      case 'weekly':
        this.chartdetail = this.barChartDataweekly;
        break;
      case 'monthly':
        this.chartdetail = this.barChartDatamonthly;
        break;

      default:
        this.chartdetail = this.barChartDatadaily;
        break;
    }
    console.log(this.chartdetail);
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}
}
