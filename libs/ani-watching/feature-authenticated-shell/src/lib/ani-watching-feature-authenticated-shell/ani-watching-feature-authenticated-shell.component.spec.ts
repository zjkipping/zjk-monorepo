import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingFeatureAuthenticatedShellComponent } from './ani-watching-feature-authenticated-shell.component';

describe('AniWatchingFeatureAuthenticatedShellComponent', () => {
  let component: AniWatchingFeatureAuthenticatedShellComponent;
  let fixture: ComponentFixture<AniWatchingFeatureAuthenticatedShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingFeatureAuthenticatedShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AniWatchingFeatureAuthenticatedShellComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
