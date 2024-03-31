import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginData: any = {};
  isAdmin: boolean = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  async submitForm(loginForm: NgForm) {
    if (loginForm.valid) {
      try {
        // Ensure both email and password are defined before calling login
        if (this.loginData.email && this.loginData.password) {
          const loginSuccessful = await this.authService.signin(this.loginData.email, this.loginData.password);
          if (loginSuccessful) {
            alert('Login successful!');
            // Store the user email ID in local storage
            localStorage.setItem('loggedInUserEmail', this.loginData.email);
            this.router.navigate(['/cart']);
          } else {
            alert('Login failed. Please try again.');
          }
        } else {
          // Handle the case where email or password is missing
          alert('Please enter both email and password.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      } finally {
        loginForm.resetForm();
      }
    } else {
      // Handle form validation errors (optional)
    }
  }

  resetForm(loginForm: NgForm) {
    loginForm.resetForm();
  }

}
