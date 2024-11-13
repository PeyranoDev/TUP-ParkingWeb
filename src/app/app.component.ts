import { Component, inject, OnInit } from '@angular/core';
import { DataAuthService } from './services/data-auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authService = inject(DataAuthService);

  ngOnInit(): void {
    this.authService.setUserByStorage();
  }
}