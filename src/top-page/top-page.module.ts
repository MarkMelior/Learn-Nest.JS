import { Module } from '@nestjs/common'
import { TopPageController } from './top-page.controller'
import { TopPageService } from './top-page.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TopPageSchema } from './top-page.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'TopPage', schema: TopPageSchema }])
	],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService]
})
export class TopPageModule {}
