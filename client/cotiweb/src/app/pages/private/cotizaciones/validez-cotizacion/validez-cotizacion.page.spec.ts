import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidezCotizacionPage } from './validez-cotizacion.page';

describe('ValidezCotizacionPage', () => {
  let component: ValidezCotizacionPage;
  let fixture: ComponentFixture<ValidezCotizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidezCotizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidezCotizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
