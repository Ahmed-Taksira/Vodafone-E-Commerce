import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  @Input() product: Product;
  userSub: Subscription;
  isAdmin: boolean;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((type) =>
      type == 'admin' ? (this.isAdmin = true) : (this.isAdmin = false)
    );
  }

  deleteProduct(id: number): void {
    this.isLoading = true;
    this.productsService.deleteProduct(id).subscribe(
      (_) => (this.isLoading = false),
      (e) => console.log(e)
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
