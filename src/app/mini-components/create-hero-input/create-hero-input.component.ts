import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-hero-input',
  templateUrl: './create-hero-input.component.html',
  styleUrls: ['./create-hero-input.component.scss'],
})
export class CreateHeroInputComponent implements OnInit {
  @Input() inputTitle = '';
  @Input() bind_to = '';
  @Output() bind_toChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  onChange(): void {
    console.log('CreateHeroInputComponent---value', this.bind_to);
  }
  ngOnInit(): void {}
}
