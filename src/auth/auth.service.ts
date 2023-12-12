import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthModel } from './auth.schema'
import { AuthDto } from './dto/auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('Auth') private authModel: Model<AuthModel>,
		private jwtService: JwtService
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10)
		const newUser = new this.authModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt)
		})
		return newUser.save()
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec()
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUser(email)
		if (!user) {
			throw new UnauthorizedException('Пользователь с таким email не найден')
		}
		const isCorrectPassword = await compare(password, user.passwordHash)
		if (!isCorrectPassword) {
			throw new UnauthorizedException('Неверный пароль')
		}
		return { email: user.email }
	}

	async login(email: string) {
		const payload = { email }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
