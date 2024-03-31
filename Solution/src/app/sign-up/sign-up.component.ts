import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user:User={}

  constructor(private userService: UserService, private router: Router) {}
  confirmPassword = '';

  

  submitForm(signupForm: NgForm) {
    // Check if the passwords match before submitting the form
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // You can perform further validation here if needed

    // Call the signup service to send data to JSON-Server
    this.userService.addUser(this.user).subscribe(
      (response) => {
      console.log('Signup successful!', response);
        // Reset the form after successful submission
        signupForm.resetForm();
        alert('signUp successful')
        this.router.navigate(['/sign-in'])
      },
      (error) => {
        console.error('Error during signup:', error);
        alert('Error during signup please try again')
        // this.router.navigate(['/login'])
      }
    );
  }
  resetForm(signupForm: any) {
    // Reset form values and mark them as pristine
    signupForm.resetForm();
  } 
}
