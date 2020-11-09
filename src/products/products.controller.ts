import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(@Body() newProduct: Product): Promise<object> {
    const generatedID = await this.productService.insertProduct(newProduct);
    return { id: generatedID };
  }

  @Get()
  async getAllProducts(): Promise<any> {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<any> {
    const product = await this.productService.getProductById(id);
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updatedProduct: Product,
  ): Promise<any> {
    await this.productService.updateProduct(id, updatedProduct);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return null;
  }
}
