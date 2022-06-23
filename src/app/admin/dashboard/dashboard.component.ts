import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';
import { BloodrequestService } from './../../service/bloodRequest/bloodrequest.service';
import { BlooddonationService } from './../../service/bloodDonation/blooddonation.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalWillingDonors: number = 0;
  totalDonations: number = 0;
  totalBloodRequests: number = 0;
  totalBloodGroups: number = 0;

  constructor(private employeeEditService: EmployeeseditService,
    private bloodDonationService: BlooddonationService,
    private bloodRequestService: BloodrequestService,
    private bloodGroupService: BloodGroupService) { }

  ngOnInit(): void {
    this.employeeEditService.allusers().subscribe(data => {
      this.totalWillingDonors = data.length;
      console.log(this.totalWillingDonors);
    });
    this.bloodDonationService.allBloodDonations()
    this.bloodDonationService.sourceMessage.subscribe(data => {
      this.totalDonations = data.length;
      console.log(this.totalDonations);
    })
    this.bloodRequestService.allBloodRequests().subscribe(data => {
      this.totalBloodRequests = data.length;
      console.log(this.totalBloodRequests);
    })
    this.bloodGroupService.allBloodGroup().subscribe(data => {
      this.totalBloodGroups = data.length;
      console.log(this.totalBloodGroups);
    })
  }

}
