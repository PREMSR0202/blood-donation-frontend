import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  Employee!: User;
  formvalue !: FormGroup;
  employees : User[] = [];
  bloodgroups : bloodGroup[] = [];
  constructor(private userservice : EmployeesService , private userdetails : EmployeeseditService , private formbuilder : FormBuilder , private bloodservice : BloodGroupService) { }

  ngOnInit(): void {
    this.userdetails.allusers().subscribe(res=>{
      this.employees=res;
    });
    
    
   
    this.formvalue = this.formbuilder.group({
      name :[''],
      email : [''],
      blood : [''],
      Blooddonated : [''],
      Mobile : ['']
      
    })
  }

  updatedetails(user : User){
    this.Employee = user;
    this.formvalue.controls['name'].setValue(user.name);
    this.formvalue.controls['email'].setValue(user.email);
    this.formvalue.controls['blood'].setValue(user.bloodGroup.bloodType);
    this.formvalue.controls['Blooddonated'].setValue(user.dob);
    this.formvalue.controls['Mobile'].setValue(user.contact);
  }

  update(){
    this.Employee.name = this.formvalue.value.name;
    this.Employee.email = this.formvalue.value.email;
    

    this.bloodservice.allBloodGroup().subscribe(bloodgroup =>{
      console.log(bloodgroup);
      this.bloodgroups = bloodgroup;
      console.log("blood groups" + this.bloodgroups);
    });
    console.log(this.bloodgroups);
    
    for(var i = 0; i < this.bloodgroups.length; i++){
      if(this.bloodgroups[i].bloodType == this.formvalue.value.blood){
        this.Employee.bloodGroup = this.bloodgroups[i];
      }
  }
    this.Employee.dob= this.formvalue.value.Blooddonated;
    this.Employee.contact = this.formvalue.value.Mobile;
    let id = this.Employee._id !;
    this.userdetails.updateuser(id , this.Employee).subscribe(res =>{
      console.log("Sucessful");
      
      let id = document.getElementById('close');
      id?.click();
      this.formvalue.reset();
    },
    err =>{
      console.log("error");
    });
  }

  delete(user :User){
    this.userdetails.deleteuser(user._id !).subscribe(res =>{
      console.log("Sucessful");
      this.userdetails.allusers().subscribe(res=>{
        this.employees=res;
      });
    },
    err =>{
      console.log("error");
    });
  }

  
  



}