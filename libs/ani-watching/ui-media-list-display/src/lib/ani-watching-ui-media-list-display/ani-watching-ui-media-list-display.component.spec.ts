import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingUiMediaListDisplayComponent } from './ani-watching-ui-media-list-display.component';

describe('AniWatchingUiMediaListDisplayComponent', () => {
  let component: AniWatchingUiMediaListDisplayComponent;
  let fixture: ComponentFixture<AniWatchingUiMediaListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingUiMediaListDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniWatchingUiMediaListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
