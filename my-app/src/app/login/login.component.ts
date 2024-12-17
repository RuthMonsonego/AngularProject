import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <p *ngIf="!loginService.getAuthenticated()">אתה לא מזוהה. אנא הזדהה על ידי לחיצה על כפתור.</p>
      <button *ngIf="!loginService.getAuthenticated()" (click)="register()" class="login-button">רישום</button>
      <button *ngIf="loginService.getAuthenticated()" (click)="logout()" class="logout-button">התנתקות</button>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public loginService: LoginService, private router: Router) { }

  register(): void {
    this.loginService.setAuthenticated(true);
    this.askAfterLogin();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  askAfterLogin(): void {
    const userChoice = confirm('האם אתה רוצה לעבור לדף ההגדרות? אם לא, תישאר בדף הבית.');
    if (userChoice) {
      this.router.navigate(['/setting']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
