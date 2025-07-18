import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { PrismaModule } from "prisma/prisma.module";
import { AdminService } from "./admin.service";



@Module({
    controllers:[AdminController],
    providers:[AdminService],
    imports: [PrismaModule],
    exports: [AdminService],
})

export class AdminModule {}