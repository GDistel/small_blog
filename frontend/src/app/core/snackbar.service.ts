import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showBasicMessage(message: string, isError = false): void {
    const config = {
      duration: 3000,
      panelClass: isError ? 'error-background' : 'primary-background'
    };
    this.snackBar.open(message, 'close', config);
  }
}
