import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { bloodRequest } from 'src/app/interfaces/bloodRequest';
import { BloodrequestService } from 'src/app/service/bloodRequest/bloodrequest.service';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.scss']
})
export class BloodRequestComponent implements OnInit {

  bloodreq : bloodRequest[] = [];
  constructor(private bloodReqService : BloodrequestService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.bloodReqService.allBloodRequests().subscribe((res)=>{
      this.bloodreq = res;
      console.log(this.bloodreq);
    },(err)=>{
      console.log("Error fetching details");
    })
  }

  deleteRequest(res : bloodRequest){
    this.bloodReqService.deleteBloodRequest(res._id).subscribe((res)=>{
      this.toastr.success("Blood Donated");
      this.bloodReqService.allBloodRequests().subscribe((res)=>{
        this.bloodreq = res;
      })
    },(err)=>{
      console.log("Error fetching details");
    })
  }
}
