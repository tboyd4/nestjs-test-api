import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }
    
    @Post()
    addProduct(@Body() newProduct: Product): object {
        const generatedID = this.productService.insertProduct(newProduct);
        return { id: generatedID};
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: string): Product {
        return this.productService.getProductById(id);
    }
}
