import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FormsModule],
  template: `
    <app-navbar />
    <main class="pt-4 pb-8">
      <router-outlet />
    </main>
  `,
  styles: `
    main {
      min-height: calc(100vh - 200px);
    }
  `,
})
export class App {
  title = 'littleberry-ng';
}
