import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoPage } from './info-producto.page';

describe('InfoProductoPage', () => {
  let component: InfoProductoPage;
  let fixture: ComponentFixture<InfoProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
