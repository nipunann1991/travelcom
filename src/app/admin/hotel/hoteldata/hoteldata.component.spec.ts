import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteldataComponent } from './hoteldata.component';

describe('HoteldataComponent', () => {
  let component: HoteldataComponent;
  let fixture: ComponentFixture<HoteldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoteldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
