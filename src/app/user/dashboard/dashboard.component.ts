import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employees : User[] = [];
  constructor(private userservice : EmployeesService , private userdetails : EmployeeseditService) { }
  searchText: string | undefined;

  ngOnInit(): void {
  
    this.userdetails.allusers().subscribe(res=>{
      this.employees=res;
    });
   
    console.log(this.employees);
  }

  updatedetails(){
    
  }

  
  



}