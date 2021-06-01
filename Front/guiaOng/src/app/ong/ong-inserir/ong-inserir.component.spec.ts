import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngInserirComponent } from './ong-inserir.component';

describe('OngInserirComponent', () => {
  let component: OngInserirComponent;
  let fixture: ComponentFixture<OngInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngInserirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
