import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer, Renderer2} from '@angular/core';
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
  currCoin: object;

  constructor(private coinMarketCapService: CoinMarketCapService, private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.coinMarketCapService.getAllCurrencyData().subscribe(data => {
      this.allCurrencies = data;
      const parent = this;
      this.drawHeatmap(this.allCurrencies).then(function (error) {
        if (error) {
          console.log(error);
        } else {
          const arr = parent.elRef.nativeElement.getElementsByClassName('leaf-node');
          for (let i = 0; i < arr.length; i++) {
            parent.renderer.listen(arr[i], 'click', event2 => {
              const el = arr[i];
              parent.removeOutlines();
              parent.generateInsight(el, parent.allCurrencies);
            });
          }
          parent.currCoin = parent.findObjectByKey(parent.allCurrencies, 'id', 'bitcoin');
        }
      });
    });
  }

  removeOutlines() {
    const circles = document.getElementsByClassName('outlined');
    for (let i = 0; i < circles.length; i++) {
      circles[i].classList.remove('outlined');
    }
  }

  generateInsight(element, currencies) {
    element.classList.add('outlined');
    console.log(this.findObjectByKey(currencies, 'id', element.id));
    this.currCoin = this.findObjectByKey(currencies, 'id', element.id);
  }

  findObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  drawHeatmap(currencies) {
    return new Promise(function (resolve, reject) {
      const h = 500;
      const w = 500;
      const data = currencies;

      /* Create the chart in the body div with a given width and height from above*/
      const svg = d3.select('#d3')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // one color function for positive, another for negative
      const colorGreen = d3.scale.linear().domain([0, 100])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#bbffbb'), d3.rgb('#00FF00')]);
      const colorRed = d3.scale.linear().domain([-100, 0])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#ff0000'), d3.rgb('#ffaaaa')]);

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

      // get the big 20 currencies
      const big_20 = [];
      for (let i = 0; i <= 21; i++) {
        big_20[i] = data[i];
      }

      // get the lower 80 currencies
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
          const change = d['percent_change_24h'];
          if (change > 0) {
            return colorGreen(change);
          } else {
            return colorRed(change);
          }
        })
        .append('svg:title').text(function (d) {
        return d['symbol'] + ' | ' + d['name'];
      });
      // select the first "all coins" sector as 'node',
      // and adjust its style... by removing the border
      const node = d3.select('.node')
        .style('stroke', 'none');
      resolve();
    });
  }

}
