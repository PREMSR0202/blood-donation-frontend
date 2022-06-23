import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private employeeseditService: EmployeeseditService,
    private toastr: ToastrService) { }

  allUsers: any[] = [];

  ngOnInit(): void {
    this.employeeseditService.sourceMessage.subscribe(data => {
      this.allUsers = data;
    });
    this.employeeseditService.allusers().subscribe();
  }

  deleteUser(id: string) {
    this.employeeseditService.deleteuser(id).subscribe(data => {
      this.employeeseditService.allusers().subscribe();
      this.toastr.success('Employee Deleted Successfully', '', {
        timeOut: 2000,
        closeButton: true,
      });
    });
  }

}
