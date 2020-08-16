import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCotizacionPage } from './tipo-cotizacion.page';

describe('TipoCotizacionPage', () => {
  let component: TipoCotizacionPage;
  let fixture: ComponentFixture<TipoCotizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCotizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCotizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
