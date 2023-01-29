import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitPossedeComponent } from './forfait-possede.component';

describe('ForfaitPossedeComponent', () => {
  let component: ForfaitPossedeComponent;
  let fixture: ComponentFixture<ForfaitPossedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfaitPossedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForfaitPossedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
