import { Injectable } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class BarServiceService {

  constructor(
  ) { }

  isLoading(){
    return false;
  }
  finished(){
return true;
  }

}
