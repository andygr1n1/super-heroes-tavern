import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navigation-menu',
  templateUrl: './top-navigation-menu.component.html',
  styleUrls: ['./top-navigation-menu.component.scss'],
})
export class TopNavigationMenuComponent implements OnInit {
  app_title = 'Super heroes';

  constructor() {}

  ngOnInit(): void {}
}
