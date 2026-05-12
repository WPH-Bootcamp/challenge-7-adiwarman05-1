import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

import { Todo } from './types';
import { isTodoArray } from './utils';

const FILE_PATH = path.join(__dirname, '../todo.json');

export function loadTodos(): Todo[] {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    if (!data.trim()) return [];
    
    const parsed = JSON.parse(data);
    return isTodoArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Gagal membaca database file, memuat data kosong.');
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan perubahan ke file.');
  }
}
