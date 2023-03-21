import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniListDataAccessAuthComponent } from './ani-list-data-access-auth.component';

describe('AniListDataAccessAuthComponent', () => {
  let component: AniListDataAccessAuthComponent;
  let fixture: ComponentFixture<AniListDataAccessAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniListDataAccessAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniListDataAccessAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
