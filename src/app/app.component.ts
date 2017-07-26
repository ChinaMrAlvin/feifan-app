import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./login.component.css']
})
export class AppComponent {
  title = 'feifan';
}
