import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(product: Product): Promise<string> {
    const newProduct = new this.productModel({
      title: product.title,
      description: product.description,
      price: product.price,
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id;
  }

  async getAllProducts(): Promise<object> {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getProductById(id: string): Promise<object> {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(productId: string, newProduct: Product) {
    const updatedProduct = await this.findProduct(productId);

    if (newProduct.title) {
      updatedProduct.title = newProduct.title;
    }
    if (newProduct.description) {
      updatedProduct.description = newProduct.description;
    }
    if (newProduct.price) {
      updatedProduct.price = newProduct.price;
    }

    updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
