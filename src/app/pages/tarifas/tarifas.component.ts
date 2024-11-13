import { Component, inject } from '@angular/core';
import { DataTarifasService } from '../../services/data-tarifas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent {
  dataTarifaService = inject(DataTarifasService)
  router = inject(Router)

  preguntarCambiarTarifa(idTarifa : string){
    Swal.fire({
      title: "Nueva cochera?",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `Cancelar`,
      input: "text",
      inputLabel: "Id Tarifa"
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.dataTarifaService.updateTarifa(idTarifa, result.value)
      } else if (result.isDenied) {
      }
    });
    this.router.navigate(['/tarifas']);
  }

}
