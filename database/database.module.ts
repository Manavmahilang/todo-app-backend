import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from 'src/todo/todo.service';
import { TodoController } from 'src/todo/todo.controller';
import { Todo } from 'src/todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class DatabaseModule {}