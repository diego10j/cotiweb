import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesPage } from './opciones.page';

describe('OpcionesPage', () => {
  let component: OpcionesPage;
  let fixture: ComponentFixture<OpcionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
