import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config';
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
  exports: [TypeOrmModule],
})
export class DbModule {}
