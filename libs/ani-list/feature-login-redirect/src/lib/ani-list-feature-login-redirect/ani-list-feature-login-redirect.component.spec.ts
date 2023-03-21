import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniListFeatureLoginRedirectComponent } from './ani-list-feature-login-redirect.component';

describe('AniListFeatureLoginRedirectComponent', () => {
  let component: AniListFeatureLoginRedirectComponent;
  let fixture: ComponentFixture<AniListFeatureLoginRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniListFeatureLoginRedirectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniListFeatureLoginRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
