import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {UserService} from '../../core/service/user/user.service';
import {AuthService} from '../../core/service/auth/auth.service';
import {ReservationService} from '../../core/service/reservation/reservation.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

  reasons = [
    'Privacy concerns',
    'Too busy/too distracting',
    'Concerned about my data',
    'Trouble getting started',
    'Want to remove something',
    'Created a second account',
    'Too many ads',
    'Something else'
  ];

  selectedReason: string | null = null;

  constructor(private router: Router, private reservationService: ReservationService, private authService: AuthService) {
  }

  toggleRadio(reason: string) {
    if (this.selectedReason === reason) {
      this.selectedReason = null;
    } else {
      this.selectedReason = reason;
    }
  }

  onSubmit() {
  }

  onDeleteAccount() {
    let email = this.authService.getLoggedUser().email;

    if (!email) {
      alert('Došlo je do greške. Pokušajte ponovo.');
      return;
    }

    this.reservationService.deleteAccount(email).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Vaš nalog je uspešno obrisan.');
          localStorage.clear();  // Brisanje korisničkih podataka
          setTimeout(() => {
            this.router.navigate(['']); // Preusmeravanje na početnu stranicu
          }, 3000);
        } else {
          alert('Ne možete obrisati nalog dok imate aktivne rezervacije.');
        }
      },
      error: () => {
        alert('Greška prilikom brisanja naloga. Pokušajte ponovo.');
      }
    });

  }

  onCancel() {
    this.router.navigate(["/profile"])
  }

}
