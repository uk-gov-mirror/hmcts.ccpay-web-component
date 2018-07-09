import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  pageTitle: string = 'InStep Movie Hunter';


  constructor(private router: Router) { }

  ngOnInit() {
  }

}
