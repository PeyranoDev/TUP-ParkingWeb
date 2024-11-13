import { Component, inject } from '@angular/core';
import { DataAuthService } from '../../services/data-auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  authService = inject(DataAuthService);
  router = inject(Router);
  isSignoutMenuVisible: boolean = false; 

  usuario: Usuario = {
    esAdmin: this.authService.usuario?.esAdmin ?? false, 
    username: this.authService.usuario?.username || '',
    token: this.authService.usuario?.token || '' 
  };

  toggleSignoutMenu(): void {
    this.isSignoutMenuVisible = !this.isSignoutMenuVisible; 
  }

  logout(){
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
