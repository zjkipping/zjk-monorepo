import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingFeaturePlannedAiringConverterComponent } from './ani-watching-feature-planned-airing-converter.component';

describe('AniWatchingFeaturePlannedAiringConverterComponent', () => {
  let component: AniWatchingFeaturePlannedAiringConverterComponent;
  let fixture: ComponentFixture<AniWatchingFeaturePlannedAiringConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingFeaturePlannedAiringConverterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AniWatchingFeaturePlannedAiringConverterComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
