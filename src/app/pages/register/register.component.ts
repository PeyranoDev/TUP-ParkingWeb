import { Component, inject } from '@angular/core';
import { DataAuthService } from '../../services/data-auth.service';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)

  async register(registerForm: NgForm){
    const {username, nombre, apellido, password} = registerForm.value;
    const registerData = {username, nombre, apellido, password};
    
    const res = await this.authService.register(registerData)

    if(res?.statusText === "Created") {
      this.router.navigate(['/login']).then(() => {
        Swal.fire("Registro exitoso", "", "success");
      })
    } else this.errorRegister = true;
  }
}
