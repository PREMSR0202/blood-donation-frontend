import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BloodGroupService } from 'src/app/service/bloodGroup/bloodgroup.service';
import { blood } from 'src/app/interfaces/blood';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-bloodgroups',
  templateUrl: './bloodgroups.component.html',
  styleUrls: ['./bloodgroups.component.scss']
})
export class BloodgroupsComponent implements OnInit {

  s : string = "";
  num: number | undefined;
  Employee!: User;
  formvalue !: FormGroup;
  employees : User[] = [];
  blood !: blood 
  dict = {};

  title = 'Blood Group';
  breadcrumb: string[] = [ 'Blood Group'];
  isLoading : boolean = true;
  constructor(private userservice : EmployeesService , private userdetails : EmployeeseditService , private formbuilder : FormBuilder , private bloodservice : BloodGroupService) { }

   bloodgrps = new Map(); 

  ngOnInit(): void {

    of(this.employees).pipe(delay(250)).subscribe((data)=>{
      this.userdetails.allusers().subscribe(res=>{
        this.employees=res;
  
      for(let i=0 ; i< this.employees.length; i++){
        this.s = this.employees[i].bloodGroup.bloodType !;
        if(this.s != undefined){
          if(this.bloodgrps.has(this.s)){
             this.num = this.bloodgrps.get(this.s);
             if(this.num){
              this.num= this.num + 1  ;
              this.bloodgrps.set(this.s,this.num );
             }
        }
        else{
          this.bloodgrps.set(this.s,1);
          console.log(this.bloodgrps.get(this.s)); 
        }
        this.isLoading = false;
        this.num=0;
        }
        
      }
      });
      
    })
    

    
}


}
