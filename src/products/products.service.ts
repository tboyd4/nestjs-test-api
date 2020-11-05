import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(product: Product): string {
        const newID = Math.random().toString()
        const newProduct = new Product(newID, product.title, product.description, product.price);
        this.products.push(newProduct);
        return newID;
    }

    getAllProducts(): Product[] {
       return [...this.products];
    }

    // currently, this method is returning a new object with whatever param we send in as id, not just pulling the one we want
    getProductById(id: string): Product {
        const product = this.products.find((prod) => {
            return prod.id = id
        })
        if (!product) {
            throw new NotFoundException();
        }
        return { ...product }
    }
}
