import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  constructor() { }

  @Input() isOpen :any;
  @Output() isOpenChange = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isOpenChange.emit(false);
  }
}
