import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'C:/My Project/TODOtask/todo-app-backend/db/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Don't use this in production, it drops the database schema and recreates it
    }),
    TodoModule,
    DatabaseModule,
  ],
})
export class AppModule {}