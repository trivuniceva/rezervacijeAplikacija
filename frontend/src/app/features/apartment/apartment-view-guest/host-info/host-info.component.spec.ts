import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostInfoComponent } from './host-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HostInfoComponent', () => {
  let component: HostInfoComponent;
  let fixture: ComponentFixture<HostInfoComponent>;

  beforeEach(async () => {
    spyOnProperty(history, 'state', 'get').and.returnValue({
      accommodation: {
        owner: {
          occupancyRate: 64,
          phone: 381641234568,
          estimatedProfit: 5067,
          priceHistory: [
            { year: 2017, price: 350000 },
            { year: 2018, price: 450000 },
            { year: 2019, price: 400000 }
          ]
        }
      }
    });

    await TestBed.configureTestingModule({
      imports: [HostInfoComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize accommodation data correctly', () => {
    expect(component.accommodation).toBeDefined();
    expect(component.host.occupancyRate).toBe(64);
    expect(component.host.phone).toBe(381641234568);
    expect(component.host.estimatedProfit).toBe(5067);
    expect(component.host.priceHistory.length).toBe(3);
  });
});
