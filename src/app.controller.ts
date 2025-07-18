// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root') // Agrupa este controlador bajo el tag "root"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener mensaje de bienvenida' })
  @ApiResponse({
    status: 200,
    description: 'Mensaje devuelto correctamente',
    schema: {
      example: {
        mensaje: 'Hola desde el servicio!',
      },
    },
  })
  root() {
    return { mensaje: this.appService.getHello() };
  }
}
