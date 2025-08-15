import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Constants } from '../models/constant.config';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const token = storageService.get(Constants.AuthToken)
    if (token) {
      return true; 
    } else {
      router.navigate(['/login']);
      return false; 
    }
};

