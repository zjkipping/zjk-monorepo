import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingFeatureAppComponent } from './ani-watching-feature-app.component';

describe('AniWatchingFeatureAppComponent', () => {
  let component: AniWatchingFeatureAppComponent;
  let fixture: ComponentFixture<AniWatchingFeatureAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingFeatureAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniWatchingFeatureAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
