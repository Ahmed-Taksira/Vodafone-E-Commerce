import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  ngOnInit(): void {
    let category = this.route.snapshot.paramMap.get('category');

    this.isLoading = true;
    this.productsSub = this.productsService
      .getProductsOfCategory(category)
      .subscribe((res) => {
        this.products = res;
        this.totalPages = Math.ceil(this.products.length / this.pageSize) - 1;
        this.isLoading = false;
      });
  }

  range(start: number, end: number) {
    const result = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
