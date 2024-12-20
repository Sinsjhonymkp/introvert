import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementsListComponent } from './shared/components/elements-list/elements-list.component';

@Component({
  selector: 'app-root',
  imports: [ElementsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-app';
}
