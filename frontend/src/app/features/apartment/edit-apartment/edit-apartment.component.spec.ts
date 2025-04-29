import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditApartmentComponent } from './edit-apartment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EditApartmentComponent', () => {
  let component: EditApartmentComponent;
  let fixture: ComponentFixture<EditApartmentComponent>;

  beforeEach(async () => {
    const mockApartment = { reservationType: 'Some Type', id: 1 };

    spyOnProperty(window, 'history').and.returnValue({
      state: { apartment: mockApartment }
    } as any);

    await TestBed.configureTestingModule({
      imports: [EditApartmentComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
