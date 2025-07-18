import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './create-admin.dto';
import { UpdateAdminDto } from './update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    return this.prisma.admin.create({
      data: {
        email: createAdminDto.email,
        passwordHash: hashedPassword,
        role: createAdminDto.role,
      },
    });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    return this.prisma.admin.delete({ where: { id } });
  }
}
