import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    console.log("inside");
    this.auth.logout();
  }

}
