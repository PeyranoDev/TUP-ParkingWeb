import { inject } from '@angular/core';
import { DataAuthService } from '../services/data-auth.service';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';


export const soloLogueadoGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.usuario?.token) return true;
  return router.parseUrl('/login');
};
