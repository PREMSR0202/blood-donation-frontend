import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'BloodDonation-FrontEnd';
  loading: boolean = true;

  constructor(private auth: AuthService) { }


  ngOnInit(): void {
    this.auth.user().subscribe((user) => {
      this.auth.setIsAdmin(user.isAdmin);
      localStorage.setItem('isAdmin', user.isAdmin.toString());
      this.loading = false;
    },
      (err) => {
        this.loading = false;
      }
    );
  }
}
