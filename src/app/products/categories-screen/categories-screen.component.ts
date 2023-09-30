import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories-screen',
  templateUrl: './categories-screen.component.html',
  styleUrls: ['./categories-screen.component.sass'],
})
export class CategoriesScreenComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  categories: string[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getCategories().subscribe((res: string[]) => {
      this.categories = res;
      this.isLoading = false;
    });
  }
}
