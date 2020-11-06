import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(product: Product): string {
    const newID = Math.random().toString();
    const newProduct = new Product(
      newID,
      product.title,
      product.description,
      product.price,
    );
    this.products.push(newProduct);
    return newID;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: string): Product {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(productId: string, newProduct: Product) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {...product};

    if (newProduct.title) {
        updatedProduct.title = newProduct.title
    }
    if (newProduct.description) {
        updatedProduct.description = newProduct.description;
    }
    if (newProduct.price) {
        updatedProduct.price = newProduct.price
    }

    this.products[index] = updatedProduct
  }

  deleteProduct(productId: string) {
      const [_, index] = this.findProduct(productId);
      this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => {
      return prod.id === id;
    });
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }
}
