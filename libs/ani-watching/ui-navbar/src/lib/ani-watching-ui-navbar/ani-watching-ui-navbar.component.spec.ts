import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniWatchingUiNavbarComponent } from './ani-watching-ui-navbar.component';

describe('AniWatchingUiNavbarComponent', () => {
  let component: AniWatchingUiNavbarComponent;
  let fixture: ComponentFixture<AniWatchingUiNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AniWatchingUiNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniWatchingUiNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
