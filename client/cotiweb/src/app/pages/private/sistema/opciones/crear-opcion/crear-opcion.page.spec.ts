import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOpcionPage } from './crear-opcion.page';

describe('CrearOpcionPage', () => {
  let component: CrearOpcionPage;
  let fixture: ComponentFixture<CrearOpcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearOpcionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOpcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
