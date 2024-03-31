import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminCredentialsUrl = 'http://localhost:3002/admin';

  constructor(private http: HttpClient) {}

  authenticateAdmin(email: string, password: string): Observable<boolean> {
    // Fetch admin credentials from the backend API
    return this.http.get<any[]>(this.adminCredentialsUrl).pipe(
      map(adminCredentialsList => {
        // Check if there is an admin with matching credentials
        const matchingAdmin = adminCredentialsList.find(admin => admin.email === email && admin.password === password);

        return !!matchingAdmin; // Return true if matchingAdmin is found, otherwise false
      })
    );
  }
}
