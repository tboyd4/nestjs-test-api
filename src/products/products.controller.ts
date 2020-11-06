import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
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

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() updatedProduct: Product): any {
        this.productService.updateProduct(id, updatedProduct)
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        this.productService.deleteProduct(id);
        return null;
    }
}
