import { Body, Controller, Post } from '@nestjs/common';
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
}
