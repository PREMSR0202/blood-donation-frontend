import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  constructor(private authService: AuthService,
    private employeeseditService: EmployeeseditService,
    private toastr: ToastrService) { }

  user: any;

  name: string = '';
  contact: string = '';
  dob: Date | undefined;
  designation: string = '';
  address: string = '';
  isInterested: boolean = false;

  clicked: boolean = true

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.name = this.user.name;
      this.contact = this.user.contact;
      this.dob = this.user.dob;
      this.designation = this.user.designation;
      this.address = this.user.address;
      this.isInterested = this.user.isInterested;
    })
  }

  editMethod() {
    this.clicked = false;
  }

  updateProfile() {
    this.employeeseditService.updateuser(this.user._id, {
      name: this.name,
      contact: this.contact,
      dob: this.dob,
      designation: this.designation,
      address: this.address,
      isInterested: this.isInterested,
    }).subscribe(res => {
      this.clicked = true;
      this.toastr.success('Profile Updated Successfully', '', {
        timeOut: 2000,
        closeButton: true,
      });
    })
  }

}
