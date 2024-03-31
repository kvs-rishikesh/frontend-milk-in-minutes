// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  product:Product[] = [];
  orderDetails: any; // Define orderDetails property
  productDetails: any; // Define productDetails property
  user: any;

  constructor(private cartService: CartService,private orderService: OrderService,private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.selectedPrice * item.quantity), 0);
  }

  updateQuantity(item: any): void {
    // Find the index of the item in the cartItems array
    const index = this.cartItems.findIndex(i => i.id === item.id);
    
    // Update the quantity of the item in the cartItems array
    if (index !== -1) {
      this.cartItems[index].quantity = item.quantity;

      // Update the cart service with the new cartItems array
      this.cartService.updateCart(this.cartItems);
    }
  }

  orderNow() {
    if (Boolean(this.authService.isLoggedIn)) {
      const orderDetails = {
        products: this.cartItems.map(item => ({ name: item.name, quantity: item.quantity, size: item.selectedSize,price: item.selectedPrice, totalAmount: item.quantity*item.selectedPrice})), // Assuming quantity is 1 for each item
        customerName: this.authService.loggedInUserName,
      };
  
      this.orderService.placeOrder(orderDetails).subscribe(
        response => {
          console.log('Order successful!', response);
          alert('Order successful!');
        },
        error => {
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again later.');
        }
      );
    } else {
      alert('Please log in before placing an order.');
      // Optionally, you can redirect to the login page or handle the non-logged-in user case accordingly
    }
}
}