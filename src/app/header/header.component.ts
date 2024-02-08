import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../style.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor( private router: Router,) { }

  ngOnInit(): void {
  }

  exit() {

    console.log("in cancel button");
    this.router.navigate(['/login']);
  }

}
