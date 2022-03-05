import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-logo',
  templateUrl: './component-logo.component.html',
  styleUrls: ['./component-logo.component.scss'],
})
export class ComponentLogoComponent implements OnInit {
  @Input() logo_title = '';

  constructor() {}

  ngOnInit(): void {}
}
