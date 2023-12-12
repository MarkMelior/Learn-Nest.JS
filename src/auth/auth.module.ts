import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSchema } from './auth.schema'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy'
import { getJWTConfig } from '../config/jwt.config'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		PassportModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
