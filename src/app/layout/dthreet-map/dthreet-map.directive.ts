import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { d3 } from 'd3';

@Directive({
  selector: '[appDthreetMap]'
})
export class DthreetMapDirective implements OnInit, AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


}
