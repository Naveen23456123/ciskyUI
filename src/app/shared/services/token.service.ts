import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Constants } from '../models/constant.config';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private storageService: StorageService) {

  }
  getDecodedToken(): any {    
    const token = this.storageService.get(Constants.AuthToken);
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }

  getClaim(key: string): any {
    const decoded = this.getDecodedToken();
    return decoded ? decoded[key] : null;
  }
}
