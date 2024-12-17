import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.getAuthenticated()) {
      return true;
    } else {
      const userChoice = confirm('אתה לא מזוהה. האם אתה רוצה להזדהות לפני כניסה לדף ההגדרות?');
      if (userChoice) {
        this.router.navigate(['/login']);
        return false;
      } else {
        alert('לא ניתן לגשת לדף ההגדרות כאנונימי.');
        return false;
      }
    }
  }
}
