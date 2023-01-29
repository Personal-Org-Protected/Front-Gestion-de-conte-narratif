import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatForfaitComponent } from './achat-forfait.component';

describe('AchatForfaitComponent', () => {
  let component: AchatForfaitComponent;
  let fixture: ComponentFixture<AchatForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatForfaitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchatForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
