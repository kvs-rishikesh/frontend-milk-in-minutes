// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() { }

  addToCart(item: any): void {
    // Add item to cart
    this.cartItems.push(item);
  }

  getCartItems(): any[] {
    // Return cart items
    return this.cartItems;
  }

  clearCart(): void {
    // Clear cart
    this.cartItems = [];
  }

  updateCart(cartItems: any[]): void {
    this.cartItems = cartItems;
  }
}
