import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LireComponent } from './lire.component';

describe('LireComponent', () => {
  let component: LireComponent;
  let fixture: ComponentFixture<LireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
