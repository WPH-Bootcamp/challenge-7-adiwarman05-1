// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

import { Todo, TodoInput } from './types';
import { loadTodos, saveTodos } from './storage';

export class TodoService {
  private todos: Todo[];

  constructor() {
    this.todos = loadTodos();
  }

  getAll(): Todo[] {
    return this.todos;
  }

  add(input: TodoInput): Todo {
    const newTodo: Todo = {
      id: Date.now(),
      task: input.task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    saveTodos(this.todos);
    return newTodo;
  }

  toggle(id: number): boolean {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return false;
    
    todo.completed = !todo.completed;
    saveTodos(this.todos);
    return true;
  }

  delete(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((t) => t.id !== id);
    
    if (this.todos.length === initialLength) return false;
    
    saveTodos(this.todos);
    return true;
  }
}
