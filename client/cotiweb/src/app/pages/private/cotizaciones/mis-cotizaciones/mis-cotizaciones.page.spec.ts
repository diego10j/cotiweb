import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCotizacionesPage } from './mis-cotizaciones.page';

describe('MisCotizacionesPage', () => {
  let component: MisCotizacionesPage;
  let fixture: ComponentFixture<MisCotizacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCotizacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCotizacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
