import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Die } from "./dice/die";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Die],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'cant-stop-dice';
}
