import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.sass'],
})
export class CategoryCardComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  @Input() category: string;

  goTo() {
    this.router.navigate([this.category], { relativeTo: this.route });
  }
}
