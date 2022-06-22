import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { CognitoService } from './service/cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'BloodDonation-FrontEnd';
  loading: boolean = true;

  constructor(private cognito: CognitoService, private auth:AuthService) {}

  ngOnInit(): void {
    this.cognito.isLoading.subscribe((data) => {
      console.log(data);
      this.loading = data;
    });
  }
}
