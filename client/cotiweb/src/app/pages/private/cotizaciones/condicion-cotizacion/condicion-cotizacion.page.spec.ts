import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionCotizacionPage } from './condicion-cotizacion.page';

describe('CondicionCotizacionPage', () => {
  let component: CondicionCotizacionPage;
  let fixture: ComponentFixture<CondicionCotizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionCotizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionCotizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
