
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: { email: string }): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: { email: string }): Promise<User> {
    return { email: payload.email } as User;
  }
}
