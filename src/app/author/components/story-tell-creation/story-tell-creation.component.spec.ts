import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTellCreationComponent } from './story-tell-creation.component';

describe('StoryTellCreationComponent', () => {
  let component: StoryTellCreationComponent;
  let fixture: ComponentFixture<StoryTellCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTellCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTellCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
