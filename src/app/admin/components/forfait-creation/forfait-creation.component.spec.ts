import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitCreationComponent } from './forfait-creation.component';

describe('ForfaitCreationComponent', () => {
  let component: ForfaitCreationComponent;
  let fixture: ComponentFixture<ForfaitCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfaitCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForfaitCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
