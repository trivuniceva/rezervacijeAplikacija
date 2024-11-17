import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApartmentViewComponent } from './edit-apartment-view.component';

describe('EditApartmentViewComponent', () => {
  let component: EditApartmentViewComponent;
  let fixture: ComponentFixture<EditApartmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditApartmentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApartmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
