import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(products: any[], currentPage: number, pageSize: number): any[] {
    if (!products || !currentPage || !pageSize) {
      return products;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, products.length);

    return products.slice(startIndex, endIndex);
  }
}
