import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor(private auth : AuthService) { }

  user : any;

  @Input() isOpen : any;
  @Output() isOpenChange = new EventEmitter<boolean>();

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
