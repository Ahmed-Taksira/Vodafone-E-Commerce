import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';

@Component({
  selector: 'app-products-screen',
  templateUrl: './products-screen.component.html',
  styleUrls: ['./products-screen.component.sass'],
})
export class ProductsScreenComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  productsSub: Subscription;
  products: Product[];

  isLoading: boolean = false;

  ngOnInit(): void {
    let category = this.route.snapshot.paramMap.get('category');

    this.isLoading = true;
    this.productsSub = this.productsService
      .getProductsOfCategory(category)
      .subscribe((res) => {
        this.products = res;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
