import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = this.products;
      this.categories = this.getCategories();
    });
  }

  getCategories(): string[] {
    const categoriesSet = new Set<string>();
    this.products.forEach(product => categoriesSet.add(product.category));
    return Array.from(categoriesSet);
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      (this.selectedCategory === '' || product.category === this.selectedCategory) &&
      (this.searchTerm === '' || product.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  searchProducts(): void {
    // This function is called when typing in the search input
    // You can implement search functionality here if needed
    // For example, you could debounce the search or perform a server-side search
    this.filterProducts();
  }

  updatePrice(product: any) {
    const index = product.sizes.indexOf(product.selectedSize);
    if (index !== -1) {
      product.selectedPrice = product.prices[index];
    } else {
      product.selectedPrice = null;
    }
  }

  isSizeDisabled(product: any, size: string): boolean {
    // This function checks if a size option should be disabled
    // You can implement custom logic here based on your requirements
    // For example, you could disable sizes that are out of stock
    // For demonstration, let's assume all sizes are always available
    return false;
  }

  addToCart(product: any): void {
    // This function is called when clicking the "Add to Cart" button
    // You can implement logic to add the product to the cart
    this.cartService.addToCart(product);
    // For demonstration, just show a snackbar
    this.snackBar.open('Product added to cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
