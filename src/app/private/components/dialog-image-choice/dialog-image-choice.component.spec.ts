import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImageChoiceComponent } from './dialog-image-choice.component';

describe('DialogImageChoiceComponent', () => {
  let component: DialogImageChoiceComponent;
  let fixture: ComponentFixture<DialogImageChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImageChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogImageChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
