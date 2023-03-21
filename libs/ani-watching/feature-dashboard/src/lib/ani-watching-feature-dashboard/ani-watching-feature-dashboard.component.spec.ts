import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingFeatureDashboardComponent } from './ani-watching-feature-dashboard.component';

describe('AniWatchingFeatureDashboardComponent', () => {
  let component: AniWatchingFeatureDashboardComponent;
  let fixture: ComponentFixture<AniWatchingFeatureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingFeatureDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniWatchingFeatureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
