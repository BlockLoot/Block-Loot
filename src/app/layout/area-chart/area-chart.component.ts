import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PriceEntry } from '../../shared/models/price-entry.model';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {
  @Input() coinData: PriceEntry[];

  constructor() {
  }

  ngOnInit() {
    this.drawLineChart();
  }

  private drawLineChart(): void {
    const svg = d3.select('svg'),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const parseTime = d3.timeParse('%Y-%m-%d');

    const x = d3.scaleTime().rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const area = d3.area().x(function (d) {
      return x(d.date);
    })
      .y1(function (d) {
        return y(d.value);
      });

    const data = this.coinData;

    const chartData = data.map(function (item) {
      item.date = parseTime(item.date);
      item.value = +item.value;
      return item;
    });

    x.domain(d3.extent(chartData, function (xData) {
      return xData.date;
    }));

    y.domain([0, d3.max(chartData, function (yData) {
      return yData.value;
    })]);

    area.y0(y(0));

    g.append('path')
      .datum(data)
      .attr('fill', 'green')
      .attr('d', area);
  }

}
