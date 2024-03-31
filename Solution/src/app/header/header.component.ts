import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loginLink: any;
  constructor(private router: Router, public authService: AuthService) { }
 
   isLoggedIn(): boolean {
     return this.authService.isLoggedIn();
   }
 
   logout() {
     this.authService.logout();
     // Redirect to login after logout
     this.router.navigate(['products']);
   }
   navigateToLogin(): void {
     this.router.navigate(['/sign-in']);
   }

}
