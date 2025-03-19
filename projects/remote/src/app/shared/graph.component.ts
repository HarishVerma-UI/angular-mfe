import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  template: ` <canvas [id]="chartId"></canvas> `,
})
export class GraphComponent implements OnChanges {
  @Input() chartId!: string;
  @Input() chartType!: keyof ChartTypeRegistry;
  @Input() chartData!: any;
  @Input() chartOptions!: any;

  private chartInstance: Chart | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const ctx = (
      document.getElementById(this.chartId) as HTMLCanvasElement
    ).getContext('2d');
    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }
}
