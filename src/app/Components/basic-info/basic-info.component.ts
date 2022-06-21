import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { mobileNumberValidator } from 'src/app/validator/registration.validator';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  userId: any = '';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  mapaddress!: string;
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
  });
}
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerDragEnd($event: google.maps.MouseEvent) {  
  this.latitude = $event.latLng.lat();
  this.longitude = $event.latLng.lng();
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude: number, longitude: number) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: any; }[], status: string) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.mapaddress = results[0].formatted_address;
        this.searchElementRef.nativeElement.value = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
  

  get userName() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get designation() {
    return this.registrationForm.get('designation');
  }

  get phno() {
    return this.registrationForm.get('phno');
  }

  get bloodgroup() {
    return this.registrationForm.get('bloodgroup');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get dob() {
    return this.registrationForm.get('dob');
  }

  registrationForm = this.formBuilder.group({
    dob: ['', Validators.required],
    designation: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phno: ['', [Validators.required, mobileNumberValidator()]],
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      this.saveBasicInfo();
    }
    // this.registerUser();
    else this.toastr.error('Please fill all the fields correctly');
  }

  saveBasicInfo() {
    const date = new Date();

    const user: User = {
      _id: this.userId,
      name: this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
      isAdmin: false,
      dob: this.dob?.value,
      bloodGroup: this.bloodgroup?.value,
      designation: this.designation?.value,
      address: this.address?.value,
      contact: this.phno?.value,
      isInterested: true,
      createdAt: date,
      updatedAt: date,
      lat: this.latitude,
      lng: this.longitude,
    };
    
    this.auth.storeBasicInfo((user));
  }
}
