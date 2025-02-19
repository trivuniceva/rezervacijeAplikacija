import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';
import {AuthService} from '../../../core/service/auth/auth.service';
import {PricingMethodFormatPipe} from '../../../pipes/pricing-method-format.pipe';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    CurrencyPipe,
    PricingMethodFormatPipe,

  ],
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input() mode: 'guest' | 'host' = 'guest';
  @Output() dateSelected = new EventEmitter<Date>();



  @Input() apartment: any;
  @Input() isEditAvailability: boolean = false;

  // @Output() reservedDaysNumChange = new EventEmitter<number>();
  @Output() reservedDaysLstChange = new EventEmitter<Date[]>();
  @Output() fullPriceNum = new EventEmitter<number>();

  currentMonth: Date = new Date();
  srecniVikend: Date[] = [];
  unavailabledDates: Date[] = [];
  reservedDates: Date[] = [];
  isSelecting: boolean = false;
  startDate: Date | null = null;
  datesInMonth: Date[] = [];

  specialPrices: { [key: string]: number } = {};
  fullPrice: number = 0;

  user: any;

  constructor(private specialPriceService: SpecialPriceServiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser()
    console.log("evo juzera breee")
    console.log(this.user)

    if (!this.apartment) {
      console.error('Apartment input is not provided!');
      return;
    }

    if (!this.apartment.availabilityList) {
      this.apartment.availabilityList = []; // Inicijalizuj ako nije definisan
    }

    this.updateCalendar();
    console.log('Received apartment:', this.apartment);

    if (this.apartment.id) {
      this.getReservedDates(this.apartment.id);
      this.loadSpecialPrices(this.apartment.id);
      this.getUnavailableDates(this.apartment.id);

    }


  }

  getReservedDates(apartmentId: number): void {
    this.specialPriceService.getReservedDatesByApartmentId(apartmentId)
      .subscribe(data => {
        this.reservedDates = data.flatMap(dateRange =>
          this.generateDateRange(new Date(dateRange[0]), new Date(dateRange[1]))
        );
        console.log('Reserved Dates:', this.reservedDates);
      }, error => {
        console.error('Error fetching reserved dates:', error);
      });
  }

  getUnavailableDates(apartmentId: number): void {
    this.specialPriceService.getUnavailableDates(apartmentId)
      .subscribe(data => {
        this.unavailabledDates = data.flatMap(dateRange =>
          this.generateDateRange(new Date(dateRange[0]), new Date(dateRange[1]))
        );
        console.log('Unavailable Dates:', this.reservedDates);
      }, error => {
        console.error('Error fetching reserved dates:', error);
      });
  }

  loadSpecialPrices(accommodationId: number): void {
    this.specialPriceService.getSpecialPricesByAccommodationId(accommodationId).subscribe((data) => {
      console.log("ljubavvvvvv")
      console.log(data);
      console.log("ljubavvvvvv")

      data.forEach((item: any) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const price = item.price;

        // Spremi cenu za svaki datum u opsegu od start_date do end_date
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const formattedDate = this.getFormattedDate(currentDate);
          this.specialPrices[formattedDate] = price;
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });
  }


  private generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  prevMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.updateCalendar();
  }

  updateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.datesInMonth = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      this.datesInMonth.push(new Date(year, month, day));
    }
  }

  toggleDateSelection(date: Date) {
    if (!this.apartment) {
      console.error('Apartment is not defined!');
      return;
    }

    if (this.isReserved(date)) {
      return;  // Ako je datum rezervisan, ne dozvoljavamo selektovanje
    }

    if (!this.apartment.availabilityList) {
      console.warn('availabilityList is not initialized. Initializing it now.');
      this.apartment.availabilityList = [];
    }

// Ako je edit dostupnosti
    if (this.isEditAvailability) {
      this.sendSelectedDatesToBackend();
    }


    if(this.user.userRole === 'HOST'){
      const index = this.unavailabledDates.findIndex(d => this.isSameDay(d, date));
      if (index === -1) {
        this.unavailabledDates.push(date);
        this.apartment.availabilityList.push(date);
        console.log("lutko <333")
        console.log(this.apartment.availabilityList);
      } else {
        this.unavailabledDates.splice(index, 1);
        this.apartment.availabilityList.splice(index, 1);
      }
    }


    if(this.user.userRole === 'GUEST'){
      if (this.isUnavailableDate(date)) {
        return;
      }

      const index = this.srecniVikend.findIndex(d => this.isSameDay(d, date));
      if (index === -1) {
        this.srecniVikend.push(date);
        this.apartment.availabilityList.push(date);
        console.log("srecni ljudi::")
        console.log(this.apartment.availabilityList);
        this.countPrice(date);

      } else {
        this.srecniVikend.splice(index, 1);
        this.apartment.availabilityList.splice(index, 1);
        const dateString = this.formatDate(date);

        if(this.checkIfSpecialPrice(dateString)){
          this.fullPrice -= this.specialPrices[dateString];
        } else {
          this.fullPrice -= this.apartment.defaultPrice;
        }
      }

      this.reservedDaysLstChange.emit(this.srecniVikend);
      // this.reservedDaysNumChange.emit(this.srecniVikend.length);
      this.fullPriceNum.emit(this.fullPrice);

    }
  }


  private formatDate(date: Date): string {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;  // Ovaj format: D/M/YYYY
  }

  private countPrice(date: Date) {
    const dateString = this.formatDate(date);
    if(this.checkIfSpecialPrice(dateString)){
      this.fullPrice += this.specialPrices[dateString];
    } else{
      this.fullPrice += this.apartment.defaultPrice;
    }
  }

  private checkIfSpecialPrice(dateString: string): boolean{
    const specialPriceKeys = Object.keys(this.specialPrices);

    if (specialPriceKeys.includes(dateString)) {
      console.log("---------------------")
      console.log("Special price found for " + dateString);
      console.log(this.specialPrices[dateString]);
      return true;
    } else {
      console.log("Date not found in special prices");
      return false;
    }
  }


  sendSelectedDatesToBackend() {
    this.specialPriceService.updateAvailability(this.apartment.id, this.unavailabledDates)
      .subscribe(response => {
        console.log('Dates updated successfully', response);
      }, error => {
        console.error('Error updating dates', error);
      });
  }

  onMouseDown(date: Date): void {
    this.isSelecting = true;
    this.startDate = date;
    this.toggleDateSelection(date);  // Selektuj odmah kada klikneš na datum
  }

  onMouseUp(): void {
    this.isSelecting = false;
    this.startDate = null;
  }

  onMouseOver(date: Date): void {
    if (this.isSelecting && this.startDate && !this.isReserved(date)) {
      this.toggleDateSelection(date);
    }
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  getFormattedDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  isReserved(date: Date): boolean {
    return this.reservedDates.some(d => this.isSameDay(d, date));
  }

  isUnavailableDate(date: Date): boolean {
    return this.unavailabledDates.some(d => this.isSameDay(d, date));
  }

  isSrecni(date: Date): boolean {
    return this.srecniVikend.some(d => this.isSameDay(d, date));
  }

}
