import { Injectable } from '@angular/core';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  constructor(private letterService:LetterInterfaceService) { }

  getLettersListComponent(){
    return this.letterService.getLettersListComponent();
  }
}
