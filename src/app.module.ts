import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TopPageModule } from './top-page/top-page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { FilesModule } from './files/files.module'
import { SitemapModule } from './sitemap/sitemap.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_DB),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		FilesModule,
		SitemapModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
