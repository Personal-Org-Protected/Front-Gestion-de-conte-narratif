import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitModificationComponent } from './forfait-modification.component';

describe('ForfaitModificationComponent', () => {
  let component: ForfaitModificationComponent;
  let fixture: ComponentFixture<ForfaitModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfaitModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForfaitModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
