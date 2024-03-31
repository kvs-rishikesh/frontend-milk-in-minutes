import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3003/orders'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  placeOrder(orderDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderDetails);
  }

  getAllOrders(): Observable<Product[]> {
    // You can choose to fetch orders from either the API or the local JSON file
    // For demonstration, I'm fetching orders from the JSON file
    return this.http.get<Product[]>(this.apiUrl);
  }

  // If you want to fetch orders specifically from the API
  // getAllOrdersFromAPI(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }
}
