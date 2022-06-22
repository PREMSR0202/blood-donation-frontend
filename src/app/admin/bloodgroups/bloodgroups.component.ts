import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bloodgroups',
  templateUrl: './bloodgroups.component.html',
  styleUrls: ['./bloodgroups.component.scss']
})
export class BloodgroupsComponent implements OnInit {

  newbloodgroup: string = "";
  bloodDelete!: bloodGroup;
  Employee!: User;
  formvalue !: FormGroup;
  bloodgrps: bloodGroup[] = [];
  constructor(private toastr: ToastrService, private userservice: EmployeesService, private userdetails: EmployeeseditService, private formbuilder: FormBuilder, private bloodservice: BloodGroupService) { }

  ngOnInit(): void {
    this.bloodservice.allBloodGroup().subscribe(blood => {
      this.bloodgrps = blood;
    });

  }

  delete() {
    this.bloodservice.deleteBloodGroup(this.bloodDelete._id!).subscribe(res => {
      console.log("Sucessful");
      let id = document.getElementById('exit');
      id?.click();
      this.bloodservice.allBloodGroup().subscribe(blood => {
        this.bloodgrps = blood;
      });
    },
      err => {
        console.log("error");
      });
  }

  deleteAccount(user: bloodGroup) {
    this.bloodDelete = user;
  }

  bgavail = false;
  add() {
    console.log(this.newbloodgroup);

    for (let i = 0; i < this.bloodgrps.length; i++) {
      if (this.bloodgrps[i].bloodType == this.newbloodgroup) {
        this.bgavail = true;
        this.toastr.error('Blood Group already Exists !!');
      }
    }

    if (!this.bgavail) {
      this.bloodservice.addBloodGroup(this.newbloodgroup).subscribe(res => {
        this.toastr.success('Blood Group added !!');
        this.bgavail = false;
        this.bloodservice.allBloodGroup().subscribe(blood => {
          this.bloodgrps = blood;
        });
      })
    }

    this.newbloodgroup = "";

  }
}
