import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPickerComponent } from './model-picker.component';

describe('ModelPickerComponent', () => {
  let component: ModelPickerComponent;
  let fixture: ComponentFixture<ModelPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
