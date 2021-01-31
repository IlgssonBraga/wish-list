import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  async store(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productService.insertOne(createProductDto);

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productService.updateOne(id, createProductDto);

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.findOne(id);

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.deleteOne(id);
  }
}
