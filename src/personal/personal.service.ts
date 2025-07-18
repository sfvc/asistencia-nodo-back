// src/personal/personal.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreatePersonalDto } from './create-personal.dto'
import { Personal } from './personal.types'
import { Prisma } from '@prisma/client'

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePersonalDto): Promise<Personal> {
    try {
      // Convertir dni a número si viene como string
      const dniNumber = typeof data.dni === 'string' ? Number(data.dni) : data.dni

      if (!Number.isInteger(dniNumber)) {
        throw new BadRequestException('El DNI debe ser un número entero válido')
      }

      const createData = {
        ...data,
        dni: dniNumber,
      }

      return await this.prisma.personal.create({ data: createData })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('El DNI ya existe')
      }
      throw error
    }
  }

  async findAll(): Promise<Personal[]> {
    return await this.prisma.personal.findMany()
  }

  async findOne(id: number): Promise<Personal | null> {
    const personal = await this.prisma.personal.findUnique({ where: { id } })
    if (!personal) throw new NotFoundException('Personal no encontrado')
    return personal
  }

  async update(id: number, data: CreatePersonalDto): Promise<Personal> {
    await this.findOne(id) // asegura que existe

    // Convertir dni a número si viene como string
    const dniNumber = typeof data.dni === 'string' ? Number(data.dni) : data.dni

    if (!Number.isInteger(dniNumber)) {
      throw new BadRequestException('El DNI debe ser un número entero válido')
    }

    const updateData = {
      ...data,
      dni: dniNumber,
    }

    return await this.prisma.personal.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id)
    await this.prisma.personal.delete({ where: { id } })
    return { message: 'Personal eliminado correctamente' }
  }
}
