import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './models/login';
import { JwtAuthService } from 'src/shared/jwt/jwt.service';

@Controller("/api")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtAuthService
    ) {}

  @Post("/auth/login")
  async login(@Body(new ValidationPipe({ whitelist: true })) loginDto: AuthRequestDto) {
    const resp = await this.authService.login(loginDto);
    const token = await this.jwtService.signPayload(resp)
    return new AuthResponseDto({token: token})
  }

  @Post("/auth/sign-up")
  async signUp(@Body(new ValidationPipe({ whitelist: true })) signInDto: AuthRequestDto){
    const resp = await this.authService.signUp(signInDto);
    const token = await this.jwtService.signPayload(resp)
    return new AuthResponseDto({token: token})
  }
}
