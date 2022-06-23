import { BlooddonationService } from './../../service/bloodDonation/blooddonation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blooddonation',
  templateUrl: './blooddonation.component.html',
  styleUrls: ['./blooddonation.component.scss']
})
export class BlooddonationComponent implements OnInit {

  constructor(private bloodDonationService: BlooddonationService) { }

  bloodDonations: any;

  ngOnInit(): void {
    this.bloodDonationService.sourceMessage.subscribe(data => {
      this.bloodDonations = data;
      console.log(data)
    })
    this.bloodDonationService.allBloodDonations()
  }

  deleteBloodDonation(id: string) {
    this.bloodDonationService.deleteBloodDonation(id)
  }

}
