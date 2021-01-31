import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

export interface CreateProductDto {
  name: string;
  price: number;
  category: string;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneOrFail(id);

    return product;
  }

  async updateOne(
    id: number,
    { name, price, category }: CreateProductDto,
  ): Promise<Product> {
    await this.productRepository.findOneOrFail(id);

    await this.productRepository.update({ id }, { name, price, category });

    const newProduct = await this.productRepository.findOne(id);

    return newProduct;
  }

  async insertOne({
    name,
    price,
    category,
  }: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({ name, price, category });

    await this.productRepository.save(product);

    return product;
  }

  async deleteOne(id: number): Promise<void> {
    await this.productRepository.findOneOrFail(id);
    this.productRepository.delete(id);
  }
}
