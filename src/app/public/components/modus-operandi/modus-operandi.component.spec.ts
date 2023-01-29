import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusOperandiComponent } from './modus-operandi.component';

describe('ModusOperandiComponent', () => {
  let component: ModusOperandiComponent;
  let fixture: ComponentFixture<ModusOperandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusOperandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusOperandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
