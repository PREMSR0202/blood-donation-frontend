import { Component, OnInit } from '@angular/core';
import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';


@Component({
  selector: 'app-bloodgroups',
  templateUrl: './bloodgroups.component.html',
  styleUrls: ['./bloodgroups.component.scss']
})

export class BloodgroupsComponent implements OnInit {

  constructor(private bloodservice: BloodGroupService) { }

  bloodgrps: any[] = [];
  newBloodGroup: string = '';

  ngOnInit(): void {
    this.bloodservice.sourceMessage.subscribe(data => {
      this.bloodgrps = data;
    })
    this.bloodservice.allBloodGroup().subscribe();
  }

  deleteBloodGroup(id: string) {
    this.bloodservice.deleteBloodGroup(id)
  }

  addBloodGroup() {
    this.bloodservice.addBloodGroup(this.newBloodGroup);
    this.newBloodGroup = '';
  }

}
