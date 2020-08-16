import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProductoPage } from './crear-producto.page';

describe('CrearProductoPage', () => {
  let component: CrearProductoPage;
  let fixture: ComponentFixture<CrearProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
