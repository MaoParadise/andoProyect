import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTestComponent } from './media-test.component';

describe('MediaTestComponent', () => {
  let component: MediaTestComponent;
  let fixture: ComponentFixture<MediaTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
