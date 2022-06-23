import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from '../Components/auth.interceptor';
import { PageTitleComponent } from './page-title/page-title.component';

const components = [
  SidebarComponent,
  NavbarComponent,
  PageTitleComponent
];

const modules = [
  CommonModule,
  HttpClientModule,
  FormsModule
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [...components,...modules]
})
export class SharedModule { }
