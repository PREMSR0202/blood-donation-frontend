import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  @Input() isOpen :any;
  @Output() isOpenChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.isOpen);
  }

  toggleSidebar() {
    this.isOpenChange.emit(false);
  }

}
