
import { Todo } from './Todo';

export class TodoManager {

    private todoList: Todo[] = [];

    constructor() {
        this.todoList = [];
    }

    addTodo(todo: Todo) {
        this.todoList.push(todo);
    }

    removeTodoById(id: number) {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
    }

    listAllTodos() {
        return this.todoList;
    }

    markTodoAsCompleted(id: number) {
        const todo = this.todoList.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
        }
    }



}