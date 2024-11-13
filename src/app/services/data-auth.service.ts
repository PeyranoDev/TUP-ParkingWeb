import { inject, Injectable } from '@angular/core';
import { Login, ResLogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { Register } from '../interfaces/register';
import { Usuario, UserByStorage } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {
  usuario: Usuario | UserByStorage | undefined;
  router = inject(Router);

  constructor() {}

  async login(loginData: Login, remember: boolean) {
    const res = await fetch("http://localhost:4000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (!resJson.token) return;

    this.usuario = {
      username: loginData.username,
      token: resJson.token,
      esAdmin: false
    };

    
    if (remember) {
      localStorage.setItem("authToken", resJson.token);
      localStorage.setItem("username", this.usuario.username);
    } else {
      sessionStorage.setItem("authToken", resJson.token);
      sessionStorage.setItem("username", this.usuario.username);
    }

    await this.fetchUserDetails(loginData.username, resJson.token);
    return res;
  }

  private async fetchUserDetails(username: string, token: string) {
    const userDetailsRes = await fetch(`http://localhost:4000/usuarios/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  
    if (userDetailsRes.status !== 200) {
      if (!this.usuario) {
        this.usuario = { username: '', token: '', esAdmin: false }; 
      } else {
        this.usuario.esAdmin = false
      }
    } else {
      const userDetailsResJson = await userDetailsRes.json();
      if (!this.usuario) {
        this.usuario = { username: '', token: token, esAdmin: true }; 
      }
      this.usuario.esAdmin = userDetailsResJson.esAdmin; 
  }}

  async register(registerData: Register) {
    const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });

    if (res.status !== 201) return;
    return res;
  }

  clearToken() {
    this.usuario = undefined;
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken"); // Asegurarse de limpiar ambos
  }

  async setUserByStorage() {
    let token = localStorage.getItem("authToken");
    let username = localStorage.getItem("username");

    if (!token) {
      token = sessionStorage.getItem("authToken");
      username = sessionStorage.getItem("username");
      if (!token) return;
    }

    const cfg = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const res = await fetch(`http://localhost:4000/usuarios/${username}`, cfg);
    if (res.ok) {
      const data = await res.json();
      this.usuario = { ...data, token }; 
      this.router.navigate(["/estado-cocheras"]);
    }
  }
}
