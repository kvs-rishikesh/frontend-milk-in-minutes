import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}
