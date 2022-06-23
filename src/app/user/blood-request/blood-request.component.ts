import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { bloodRequest } from 'src/app/interfaces/bloodRequest';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import { BloodrequestService } from 'src/app/service/bloodRequest/bloodrequest.service';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.scss']
})
export class BloodRequestComponent implements OnInit {

  bloodreq : bloodRequest[] = [];
  bloodrequest : bloodRequest[] = [];
  usr !: any;
  bloodtype !: string
  blood !: string
  constructor(private bloodReqService : BloodrequestService , private toastr : ToastrService , private user : AuthService) { }

  ngOnInit(): void {
    this.bloodReqService.allBloodRequests().subscribe((res)=>{
      this.bloodreq = res;
      this.user.user().subscribe((res)=>{
        this.usr = res;
        this.bloodtype = this.usr.bloodGroup.bloodType
        console.log("array"+this.bloodreq)
        for(let i=0 ; i< this.bloodreq.length ; i++){
          this.blood = this.bloodreq[i].bloodType;
          if(this.blood == this.bloodtype){
            this.bloodrequest.push(this.bloodreq[i]);
          }
        }
      },(err)=>{
        console.log("Error fetching details");
      })

      });
     
  }

}
