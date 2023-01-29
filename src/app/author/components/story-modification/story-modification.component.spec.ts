import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryModificationComponent } from './story-modification.component';

describe('StoryModificationComponent', () => {
  let component: StoryModificationComponent;
  let fixture: ComponentFixture<StoryModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
