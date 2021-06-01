import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngListaComponent } from './ong-lista.component';

describe('OngListaComponent', () => {
  let component: OngListaComponent;
  let fixture: ComponentFixture<OngListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
