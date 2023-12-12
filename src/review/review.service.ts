import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ReviewModel } from './review.schema'
import { Model } from 'mongoose'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel('Review') private reviewModel: Model<ReviewModel>
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		return this.reviewModel.create(dto)
	}

	async delete(id: string): Promise<ReviewModel | null> {
		return this.reviewModel.findByIdAndDelete(id).exec()
	}

	async findByProductId(productId: string): Promise<ReviewModel[]> {
		return this.reviewModel.find({ productId: productId }).exec()
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: productId }).exec()
	}
}
