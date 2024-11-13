import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataTarifasService {
  tarifas: Tarifa[] = []
  authService = inject(DataAuthService);
  url = "http://localhost:4000/"
  token = this.authService.usuario?.token;
  
  constructor() { 
    this.getTarifas()
  }

  async getTarifas(){
    const res = await fetch(this.url + 'tarifas',{
      headers: {
        authorization:'Bearer '+ this.token
      },
    })
    if(res.status !== 200) {
      console.log("Error")
    } else {
      this.tarifas = await res.json();
    }
  }

  async updateTarifa(idTarifa: string, valor: number) {
    const res = await fetch(`${this.url}tarifas/${idTarifa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.token
      },
      body: JSON.stringify({ valor })
    });
    
    if (res.status !== 200) {
      console.error("Error en la edición de tarifa");
    } else {
      const updatedData = await res.json();
      this.tarifas = this.tarifas.map(tarifa =>
        tarifa.id === idTarifa ? { ...tarifa, ...updatedData } : tarifa
      );
      this.getTarifas();
    }
  }
}