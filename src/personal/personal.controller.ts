// src/personal/personal.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { PersonalService } from './personal.service'
import { CreatePersonalDto } from './create-personal.dto'
import { Personal } from './personal.types'

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  async create(@Body() createDto: CreatePersonalDto): Promise<Personal> {
    return await this.personalService.create(createDto)
  }

  @Get()
  async findAll(): Promise<Personal[]> {
    return await this.personalService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Personal | null> {
    return await this.personalService.findOne(Number(id))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreatePersonalDto,
  ): Promise<Personal> {
    return await this.personalService.update(Number(id), updateDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.personalService.remove(Number(id))
  }
}