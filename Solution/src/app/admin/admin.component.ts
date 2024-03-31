import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  adminLoginData: any = {};

  constructor(
    private router: Router,
    private adminAuthService: AdminService,
  ) {}

  submitAdminLogin(adminLoginForm: NgForm) {
    if (adminLoginForm.valid) {
      const { email, password } = this.adminLoginData;

      // Simulate authentication using a service
      this.adminAuthService.authenticateAdmin(email, password).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          
          // Navigate to the admin dashboard on successful login
          this.router.navigate(['/order-requests']);

          // Show a success notification
          alert('Admin login successful!');
        } else {
          // Handle login failure (show error message, etc.)
          console.log('Invalid admin credentials');

          // Show an error notification
          alert('Invalid admin credentials. Please Try Again.');
        }
      });
    }
  }

}
