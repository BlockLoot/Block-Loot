import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {

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

    const parseTime = d3.timeParse('%d-%b-%y');

    const x = d3.scaleTime().rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const area = d3.area().x(function (d) {
      return x(d.date);
    })
      .y1(function (d) {
        return y(d.close);
      });


    d3.json('../../assets/data.json', function (error, data) {
      if (error) {
        throw error;
      }

      const chartData = data.map(function (item) {
        item.date = parseTime(item.date);
        item.close = +item.close;
        return item;
      });

      x.domain(d3.extent(chartData, function (data) {
        return data.date;
      }));

      y.domain([0, d3.max(chartData, function (data) {
        return data.close;
      })]);

      area.y0(y(0));

      g.append('path')
        .datum(data)
        .attr('fill', 'green')
        .attr('d', area);
    });
  }

}
