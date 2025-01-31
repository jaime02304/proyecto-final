import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegadorComponent } from "./menu-navegador/menu-navegador.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavegadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-final';
}
