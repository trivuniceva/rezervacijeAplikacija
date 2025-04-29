import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedViewBaseComponent } from './detailed-view-base.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { of } from 'rxjs';

describe('DetailedViewComponent', () => {
  let component: DetailedViewBaseComponent;
  let fixture: ComponentFixture<DetailedViewBaseComponent>;

  beforeEach(async () => {
    const authServiceMock = {
      userRole$: of('REGISTERED_USER'),
    };

    await TestBed.configureTestingModule({
      imports: [DetailedViewBaseComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
