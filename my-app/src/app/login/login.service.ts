import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;

  constructor() { }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  logout(): void {
    this.isAuthenticated = false;
  }
}
