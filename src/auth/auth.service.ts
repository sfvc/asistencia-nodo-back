// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin) return null;

    const passwordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordValid) return null;

    // devolvemos solo los datos necesarios
    return { id: admin.id, email: admin.email, role: admin.role };
  }

  async login(admin: { id: number; email: string; role: string }) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}