import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss'],
})
export class BubbleChartComponent implements OnInit {
  chartDetail: any;
  public bubbleChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        min: 0,
        max: 30,
        ticks: {},
      },
      y: {
        min: 0,
        max: 30,
        ticks: {},
      },
    },
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartDatadaily: ChartData<'bubble'> = {
    labels: [],
    datasets: [
      {
        data: [
          { x: 10, y: 10, r: 10 },
          { x: 15, y: 5, r: 15 },
          { x: 26, y: 12, r: 23 },
          { x: 7, y: 8, r: 8 },
        ],
        label: 'Series A',
        backgroundColor: [
          'red',
          'green',
          'blue',
          'purple',
          'yellow',
          'brown',
          'magenta',
          'cyan',
          'orange',
          'pink',
        ],
        borderColor: 'blue',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
    ],
  };
  public bubbleChartDataweekly: ChartData<'bubble'> = {
    labels: [],
    datasets: [
      {
        data: [
          { x: 10, y: 10, r: 10 },
          { x: 25, y: 5, r: 15 },
          { x: 30, y: 12, r: 23 },
          { x: 7, y: 8, r: 8 },
        ],
        label: 'Series A',
        backgroundColor: [
          'red',
          'green',
          'blue',
          'purple',
          'yellow',
          'brown',
          'magenta',
          'cyan',
          'orange',
          'pink',
        ],
        borderColor: 'blue',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
    ],
  };
  public bubbleChartDatamonthly: ChartData<'bubble'> = {
    labels: [],
    datasets: [
      {
        data: [
          { x: 10, y: 20, r: 10 },
          { x: 25, y: 5, r: 15 },
          { x: 26, y: 2, r: 23 },
          { x: 67, y: 8, r: 38 },
        ],
        label: 'Series A',
        backgroundColor: [
          'red',
          'green',
          'blue',
          'purple',
          'yellow',
          'brown',
          'magenta',
          'cyan',
          'orange',
          'pink',
        ],
        borderColor: 'blue',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
  filter(type: string) {
    this.chartDetail = null;
    switch (type) {
      case 'daily':
        this.chartDetail = {
          labels: [],
          datasets: [
            {
              data: [
                { x: 10, y: 10, r: 10 },
                { x: 15, y: 5, r: 15 },
                { x: 26, y: 12, r: 23 },
                { x: 7, y: 8, r: 8 },
              ],
              label: 'Series A',
              backgroundColor: [
                'red',
                'green',
                'blue',
                'purple',
                'yellow',
                'brown',
                'magenta',
                'cyan',
                'orange',
                'pink',
              ],
              borderColor: 'blue',
              hoverBackgroundColor: 'purple',
              hoverBorderColor: 'red',
            },
          ],
        };
        break;
      case 'weekly':
        this.chartDetail = this.bubbleChartDataweekly;
        break;
      case 'monthly':
        this.chartDetail = this.bubbleChartDatamonthly;
        break;
      default:
        this.chartDetail = this.bubbleChartDatadaily;
        break;
    }
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  private rand(max: number): number {
    return Math.trunc(Math.random() * max);
  }

  private randomPoint(maxCoordinate: number): {
    r: number;
    x: number;
    y: number;
  } {
    const x = this.rand(maxCoordinate);
    const y = this.rand(maxCoordinate);
    const r = this.rand(30) + 5;
    return { x, y, r };
  }
}
