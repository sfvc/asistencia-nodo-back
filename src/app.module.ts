import { Module } from '@nestjs/common';
import { PersonalModule } from './personal/personal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PersonalModule, AuthModule, PrismaModule, AdminModule],
  controllers: [AppController], 
  providers: [AppService, JwtStrategy],
})
export class AppModule {}