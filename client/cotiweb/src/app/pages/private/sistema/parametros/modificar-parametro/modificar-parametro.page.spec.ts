import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarParametroPage } from './modificar-parametro.page';

describe('ModificarParametroPage', () => {
  let component: ModificarParametroPage;
  let fixture: ComponentFixture<ModificarParametroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarParametroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarParametroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
