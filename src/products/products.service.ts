import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    products: Product[];

    insertProduct(product: Product): string {
        const newID = new Date().toString()
        const newProduct = new Product(newID, product.title, product.description, product.price);
        this.products.push(newProduct);
        return newID;
    }
}
