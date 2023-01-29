import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagModificationComponent } from './tag-modification.component';

describe('TagModificationComponent', () => {
  let component: TagModificationComponent;
  let fixture: ComponentFixture<TagModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
