import { ToastrService } from 'ngx-toastr';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeseditService: EmployeeseditService,) { }

  allUsers: any[] = [];

  ngOnInit(): void {
    this.employeeseditService.sourceMessage.subscribe(data => {
      this.allUsers = data;
    });
    this.employeeseditService.allusers().subscribe();
  }

}
