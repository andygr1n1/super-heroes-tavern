import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  app_title = 'Super heroes';

  isActive(activeRoute: string): boolean {
    return false;
  }
}
