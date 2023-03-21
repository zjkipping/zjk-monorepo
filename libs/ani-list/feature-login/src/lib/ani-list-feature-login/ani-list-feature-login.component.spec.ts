import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniListFeatureLoginComponent } from './ani-list-feature-login.component';

describe('AniListFeatureLoginComponent', () => {
  let component: AniListFeatureLoginComponent;
  let fixture: ComponentFixture<AniListFeatureLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniListFeatureLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniListFeatureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
