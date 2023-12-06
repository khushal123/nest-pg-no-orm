import { Module } from '@nestjs/common';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { EquipmentModule } from './equipment/equipment.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ManufacturerModule, EquipmentModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true
  })],
})
export class AppModule { }
