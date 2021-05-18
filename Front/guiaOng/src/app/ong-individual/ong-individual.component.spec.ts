import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngIndividualComponent } from './ong-individual.component';

describe('OngIndividualComponent', () => {
  let component: OngIndividualComponent;
  let fixture: ComponentFixture<OngIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
