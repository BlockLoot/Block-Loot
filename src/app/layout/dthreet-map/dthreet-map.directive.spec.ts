import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DthreetMapDirective } from './dthreet-map.directive';

@Component({
  template: `<div appDthreetMap></div>`
})
export class TestDThreetMapComponent { }

fdescribe('DthreetMapDirective', () => {
  let fixture: ComponentFixture<TestDThreetMapComponent>;
  let component: TestDThreetMapComponent;
  let srcEl: DebugElement;
  let directive: DthreetMapDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DthreetMapDirective, TestDThreetMapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDThreetMapComponent);
    component = fixture.componentInstance;
    srcEl = fixture.debugElement.query(By.css('div'));
    directive = srcEl.injector.get(DthreetMapDirective);

    fixture.detectChanges();
  });

  describe('DthreetMapDirective',() => {
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });


});
