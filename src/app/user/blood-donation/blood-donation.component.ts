import { AuthService } from 'src/app/service/auth.service';
import { BlooddonationService } from './../../service/bloodDonation/blooddonation.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blood-donation',
  templateUrl: './blood-donation.component.html',
  styleUrls: ['./blood-donation.component.scss']
})
export class BloodDonationComponent implements OnInit {

  constructor(private bloodDonationService: BlooddonationService,
    private authService: AuthService, private toastr: ToastrService) { }

  donatedPlace: string = "";
  donationDate: Date | undefined;
  userId: string = "";
  donations: any[] = [];

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      this.userId = user._id;
    })
    this.bloodDonationService.sourceMessage.subscribe(data => {
      this.donations = data.filter((data) => data.user._id === this.userId);
      console.log(this.donations);
    })
    this.bloodDonationService.allBloodDonations()
  }

  addDonation() {
    this.bloodDonationService.addBloodDonation({
      donatedPlace: this.donatedPlace,
      donationDate: this.donationDate
    });
    this.donatedPlace = "";
    this.donationDate = undefined;

  }

}
