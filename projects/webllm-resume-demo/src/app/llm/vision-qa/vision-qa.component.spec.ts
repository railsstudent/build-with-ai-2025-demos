import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionQAComponent } from './vision-qa.component';

describe('VisionQAComponent', () => {
  let component: VisionQAComponent;
  let fixture: ComponentFixture<VisionQAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionQAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
