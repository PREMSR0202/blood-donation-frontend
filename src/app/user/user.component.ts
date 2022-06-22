import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { 

    if(window.innerWidth <992)
      this.isOpen = false;
    else
      this.isOpen = true;
    window.addEventListener('resize', (e) => {
      if(window.innerWidth <992)
        this.isOpen = false;
      else
        this.isOpen = true;
    })
  }
  isOpen: boolean = true;
  ngOnInit(): void {
  }

  isOpenChange(open:boolean){
    this.isOpen = !open;
  }

}
