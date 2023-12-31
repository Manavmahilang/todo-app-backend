import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) { }

  async create(todoData: any): Promise<Todo | Todo[]> {
    try {
      const todo = this.todoRepository.create(todoData);
      const createdTodo = await this.todoRepository.save(todo);
      return createdTodo;
    } catch (error) {
      // Log the error or handle it in a way that makes sense for your application
      console.error('Error creating todo:', error.message);
      throw new Error('Failed to create todo');
    }
  }
  async findAll(): Promise<Todo[]> {
    try {
      const todos = await this.todoRepository.find();
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      throw new Error('Failed to fetch todos');
    }
  }

  async findById(id: number): Promise<Todo | undefined> {
    try {
      const todo = await this.todoRepository
        .createQueryBuilder('todo')
        .where('todo.id = :id', { id })
        .getOne();
      return todo;
    } catch (error) {
      console.error('Error fetching todo by ID:', error.message);
      throw new Error('Failed to fetch todo by ID');
    }
  }

  async findByTitle(title: string): Promise<Todo | undefined> {
    try {
      const todo = await this.todoRepository
        .createQueryBuilder('todo')
        .where('todo.title = :title', { title })
        .getOne();
      return todo;
    } catch (error) {
      console.error('Error fetching todo by title:', error.message);
      throw new Error('Failed to fetch todo by title');
    }
  }

async updateById(id: number, updatedTodoData: any): Promise < Todo | undefined > {
  try {
    await this.todoRepository.update(id, updatedTodoData);
    const updatedTodo = await this.todoRepository.findOne({ where: { id } });
    return updatedTodo;
  } catch(error) {
    console.error('Error updating todo by ID:', error.message);
    throw new Error('Failed to update todo by ID');
  }
}

 async deleteById(id: number): Promise < Todo | undefined > {
  try {
    const todo = await this.todoRepository.findOne({ where: { id } });
    await this.todoRepository.delete(id);
    return todo;
  } catch(error) {
    console.error('Error deleting todo by ID:', error.message);
    throw new Error('Failed to delete todo by ID');
  }
}
}