import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreAfficheComponent } from './livre-affiche.component';

describe('LivreAfficheComponent', () => {
  let component: LivreAfficheComponent;
  let fixture: ComponentFixture<LivreAfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreAfficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
