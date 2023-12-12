/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@Prop()
	count: number

	@Prop()
	juniorSalary: number

	@Prop()
	middleSalary: number

	@Prop()
	seniorSalary: number
}

export class TopPageAdvantages {
	@Prop()
	title: string

	@Prop()
	description: string
}

@Schema({
	timestamps: true,
	autoIndex: true
})
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory

	@Prop()
	secondCategory: string

	@Prop({ unique: true })
	alias: string

	@Prop()
	title: string

	// @Prop()
	// metaTitle: string;

	// @Prop()
	// metaDescription: string;

	@Prop()
	category: string

	@Prop({ type: () => HhData })
	hh?: HhData

	@Prop({ type: () => [TopPageAdvantages] })
	advantages: TopPageAdvantages[]

	@Prop()
	seoText: string

	@Prop()
	tagsTitle: string

	@Prop({ type: () => [String] })
	tags: string[]
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
