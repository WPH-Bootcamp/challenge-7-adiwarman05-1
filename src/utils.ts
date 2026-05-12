// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

import { TodoItem } from './types.js';

/**
 * Type Guard untuk memeriksa apakah sebuah objek adalah TodoItem yang valid
 */
export function isTodoItem(obj: any): obj is TodoItem {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.id === 'number' &&
    typeof obj.task === 'string' &&
    typeof obj.completed === 'boolean'
  );
}

/**
 * Helper untuk membersihkan dan memvalidasi string input
 */
export function sanitizeInput(text: string): string {
  return text.trim();
}

/**
 * Helper untuk memberikan visualisasi status tugas yang rapi
 */
export function formatTodoStatus(completed: boolean): string {
  return completed ? '[✓] Selesai' : '[ ] Belum Selesai';
}
