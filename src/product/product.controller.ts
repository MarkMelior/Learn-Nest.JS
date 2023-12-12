import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductModel } from './product.schema'
import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id)
		if (!product) {
			throw new NotFoundException('Продукт с таким ID не найден')
		}
		return product
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id)
		if (!deletedProduct) {
			throw new NotFoundException('Продукт с таким ID не найден')
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ProductModel
	) {
		const updatedProduct = await this.productService.updateById(id, dto)
		if (!updatedProduct) {
			throw new NotFoundException('Продукт с таким ID не найден')
		}
		return updatedProduct
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto)
	}
}
