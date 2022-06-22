import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { User } from 'src/app/interfaces/user';
import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';

@Component({
  selector: 'app-blood-donation',
  templateUrl: './blood-donation.component.html',
  styleUrls: ['./blood-donation.component.scss']
})
export class BloodDonationComponent implements OnInit {

  userDelete!: User;
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


  delete(){
    this.userdetails.deleteuser(this.userDelete._id !).subscribe(res =>{
      console.log("Sucessful");
      let id = document.getElementById('exit');
      id?.click();
      this.userdetails.allusers().subscribe(res=>{
        this.employees=res;
      });
    },
    err =>{
      console.log("error");
    });
  }

  deleteAccount(user: User){
    this.userDelete = user;
  }

  
  filterTable(){
    var input, filter, table, tr, bg, name, i, txtValue ,nameValue ,msg;
    input = document.getElementById("search") as HTMLInputElement;
    filter = input.value.toUpperCase();
    table = document.getElementById("searchTable") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    msg = document.getElementById("msg") as HTMLElement;
    for (i = 0; i < tr.length; i++) {
      bg = tr[i].getElementsByTagName("td")[1];
      name = tr[i].getElementsByTagName("td")[0];
      if (bg || name) {
        txtValue = bg.textContent || bg.innerText;
        nameValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1  || nameValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        }
        else{
          tr[i].style.display = "none";
        }
      }          
    }
  }

}
