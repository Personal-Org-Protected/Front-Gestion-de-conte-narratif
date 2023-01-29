import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTellModificationComponent } from './story-tell-modification.component';

describe('StoryTellModificationComponent', () => {
  let component: StoryTellModificationComponent;
  let fixture: ComponentFixture<StoryTellModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTellModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTellModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
