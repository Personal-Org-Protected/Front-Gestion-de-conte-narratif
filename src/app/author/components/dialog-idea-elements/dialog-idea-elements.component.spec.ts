import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIdeaElementsComponent } from './dialog-idea-elements.component';

describe('DialogIdeaElementsComponent', () => {
  let component: DialogIdeaElementsComponent;
  let fixture: ComponentFixture<DialogIdeaElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIdeaElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogIdeaElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
