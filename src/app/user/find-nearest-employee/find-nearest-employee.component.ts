import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeseditService } from 'src/app/service/user/employeesedit.service';

@Component({
  selector: 'app-find-nearest-employee',
  templateUrl: './find-nearest-employee.component.html',
  styleUrls: ['./find-nearest-employee.component.scss'],
})
export class FindNearestEmployeeComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private employeeseditService: EmployeeseditService,
    private auth : AuthService
  ) {}

  latitude!: number;
  longitude!: number;
  zoom!: number;
  mapaddress!: string;
  private geoCoder!: google.maps.Geocoder;
  allUsers: any[] = [];
  currentUser: any;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  ngOnInit(): void {
    this.employeeseditService.sourceMessage.subscribe((data) => {
      this.allUsers = data;
      console.log(data)
    });
    this.auth.currentUserData.subscribe(data => {
      this.currentUser = data;
    })
    this.employeeseditService.allusers().subscribe();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
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
          this.employeeseditService.findNearestUsers(this.latitude, this.longitude);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }
}
