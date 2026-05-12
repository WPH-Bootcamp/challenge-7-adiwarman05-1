import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

import { TodoItem } from './types.js';
import { sanitizeInput } from './utils.js';

let todos: TodoItem[] = [];

export function getTodos(): TodoItem[] {
  return todos;
}

export function addTodoItem(taskName: string): TodoItem {
  const newItem: TodoItem = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    task: sanitizeInput(taskName),
    completed: false
  };
  todos.push(newItem);
  return newItem;
}

export function updateTodoStatus(completedIds: number[]): void {
  todos = todos.map(t => ({
    ...t,
    completed: completedIds.includes(t.id)
  }));
}

export function deleteTodoItem(id: number): void {
  todos = todos.filter(t => t.id !== id);
}
