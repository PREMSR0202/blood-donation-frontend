import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  @Input() isOpen :any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isOpen);
  }

}
