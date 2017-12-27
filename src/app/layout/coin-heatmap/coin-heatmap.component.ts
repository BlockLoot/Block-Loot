import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Currency} from '../../shared/models/currency.model';
import {CoinMarketCapService} from '../../data/coin-market-cap.service';

@Component({
  selector: 'app-coin-heatmap',
  templateUrl: './coin-heatmap.component.html',
  styleUrls: ['./coin-heatmap.component.scss']
})
export class CoinHeatmapComponent implements OnInit {
  allCurrencies: Currency[];

  constructor(private coinMarketCapService : CoinMarketCapService) {
  }

  ngOnInit() {
    this.coinMarketCapService.getAllCurrencyData().subscribe(data => {
      this.allCurrencies = data;
      this.drawHeatmap();
    });
  }

  drawHeatmap() {
      const h = 500;
      const w = 500;
      const data = this.allCurrencies;

      /* Create the chart in the body div with a given width and height from above*/
      const svg = d3.select('#d3')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      const color = d3.scale.linear().domain([-100, 100])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#ff0000'), d3.rgb('#00ff00')]);

      // establish the 'g' element into svg for d3 to write to
      // this element is now bound to the variable 'dots'
      const dots = svg.append('g').attr('id', 'dots');

      // initialize the 'pack' function from d3.layout
      // provide that interface with a given size and value
      const pack = d3.layout.pack()
        .size([w, h])
        .value(function (d) {
          return Number(d['market_cap_usd']);
        });

      const big_20 = [];
      for (let i = 0; i <= 21; i++) {
        big_20[i] = data[i];
      }

      const remaining = [];
      for (let i = 22; i < data.length; i++) {
        remaining[i - 22] = data[i];
      }

      const coin_sectors = {
        name: 'All Coins',
        value: 100,
        symbol: 'Sector',
        children: [
          {
            name: 'Top 20',
            value: 20,
            symbol: 'Sector',
            children: big_20
          },
          {
            name: 'Alts',
            value: 80,
            symbol: 'Sector',
            children: remaining
          }
        ]
      };

      // call the pack method
      // Some kind of tree gets generated and passed into the data method below
      const nodes = pack(coin_sectors);

      // do some d3 magic to the 'g' element in our svg
      dots.selectAll()
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', function (d) {
          return d.r;
        })
        .attr('class', function (d) {
          return d.children ? 'node' : 'leaf-node';
        })
        .attr('id', function (d) {
          return d['id'];
        })
        .attr('cx', function (d, i) {
          return d.x;
        })
        .attr('cy', function (d, i) {
          return d.y;
        })
        .style('fill', function (d) {
          return color(d['percent_change_24h']);
        })
        .append('svg:title').text(function (d) {
        return d['symbol'] + ' | ' + d['name'];
      });

      // select the first "all coins" sector as 'node',
      // and adjust its style... by removing the border
      const node = d3.select('.node')
        .style('stroke', 'none');
  }

}
