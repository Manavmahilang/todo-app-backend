import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() todoData: any) {
    // Call the TodoService to handle storing the data in the database
    const createdTodo = await this.todoService.create(todoData);
    return createdTodo;
  }

  @Get()
  async getAllTodos() {
    const todos = await this.todoService.findAll();
    return todos;
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    const todo = await this.todoService.findById(+id); // Convert id to a number
    return todo;
  }
  @Get('title')
  async getTodoByTitle(@Query('title') title: string) {
    const todo = await this.todoService.findByTitle(title);
    return todo;
  }
  @Put(':id')
  async updateTodoById(@Param('id') id: string, @Body() updatedTodoData: any) {
    const updatedTodo = await this.todoService.updateById(+id, updatedTodoData);
    return updatedTodo;
  }
  @Delete(':id')
  async deleteTodoById(@Param('id') id: string) {
    const deletedTodo = await this.todoService.deleteById(+id);
    return deletedTodo;
  }
}