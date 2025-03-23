import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoderQAComponent } from './coder-qa.component';

describe('CoderQAComponent', () => {
  let component: CoderQAComponent;
  let fixture: ComponentFixture<CoderQAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoderQAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoderQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
