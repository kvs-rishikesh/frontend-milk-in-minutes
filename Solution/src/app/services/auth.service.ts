import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedInUser: any; /* Use a private variable for user data */
  private _isLoggedIn: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  signin(username: string, password: string): Promise<boolean> {
    // Replace with your actual login logic, potentially using a backend service or API
    console.log(`Simulating login with username: ${username}, password: ${password}`);

    // Simulate successful login for demonstration purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        this._isLoggedIn = true;
        this._loggedInUser = { name: 'Example User' }; // Set user data (replace with actual data)
        resolve(true);
      }, 1000); // Simulate a delay (replace with actual login time)
    });
  }

  logout(): void {
    // Replace with your actual logout logic, potentially clearing tokens or session data
    console.log('Simulating logout');
    this._isLoggedIn = false;
    this._loggedInUser = null;
  }

  getUserDetails(): Observable<User> {
    // Simulate fetching user details from somewhere (e.g., API)
    // Here, we just return an observable with the logged-in user
    return of(this._loggedInUser);
  }

  get loggedInUser(): any {
    return this._loggedInUser; // Public getter for user data
  }

  get loggedInUserName(): string {
    return this._loggedInUser ? this._loggedInUser.name : '';
  }
}
