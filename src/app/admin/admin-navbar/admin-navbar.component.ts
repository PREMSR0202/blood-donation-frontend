import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {


  @Input() isOpen : any;
  @Output() isOpenChange = new EventEmitter<boolean>();

  user : any;

  constructor(private auth : AuthService) { }
  ngOnInit(): void {
    this.auth.currentUserData.subscribe(data => {
      this.user = data;
    })
    this.auth.getCurrentUser();
  }
  logout(){
    console.log("inside");
    this.auth.logout();
  }
  toggleIsOpen(open : boolean){
    console.log(open)
    this.isOpenChange.emit(open);
  }

}
