// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');

import inquirer from 'inquirer';
import { TodoService } from './todoService';
import { formatDate } from './utils';

const todoService = new TodoService();

// Menu Utama Todo App (Berbasis Ketik Angka)

async function mainMenu(): Promise<void> {
  console.log('\n--- MENU UTAMA TODO APP ---');
  console.log('1. 📋 Lihat Semua Tugas');
  console.log('2. ➕ Tambah Tugas (Templat)');
  console.log('3. 🔄 Ubah Status Selesai');
  console.log('4. ❌ Hapus Tugas');
  console.log('5. 🚪 Keluar');

  const { choice } = await inquirer.prompt([
    {
      type: 'input',
      name: 'choice',
      message: 'Masukkan nomor perintah (1-5):',
      validate: (input) => {
        const num = parseInt(input.trim(), 10);
        if (num >= 1 && num <= 5) return true;
        return '⚠️ Input salah! Masukkan angka antara 1 sampai 5.';
      },
    },
  ]);

  // Eksekusi fungsi berdasarkan nomor yang diketik

  switch (choice.trim()) {
    case '1':
      renderList();
      break;
    case '2':
      await promptAddFromTemplates();
      break;
    case '3':
      await promptToggle();
      break;
    case '4':
      await promptDelete();
      break;
    case '5':
      console.log('\nSampai jumpa lagi! Terima kasih.');
      process.exit(0);
  }

  console.log('\n' + '='.repeat(30));
  await mainMenu();
}

// Menampilkan daftar tugas

function renderList(): void {
  const todos = todoService.getAll();
  console.log('\n📋 === DAFTAR TUGAS ANDA ===');

  if (todos.length === 0) {
    console.log('ℹ️ Tidak ada tugas tersimpan saat ini.');
    return;
  }

  todos.forEach((todo, index) => {
    const statusIcon = todo.completed ? '✅ [SELESAI]' : '⏳ [BELUM]';
    const timeFormatted = formatDate(todo.createdAt);
    console.log(`${index + 1}. ${statusIcon} ${todo.task}`);
    console.log(`   └─ 📅 ${timeFormatted} | ID: ${todo.id}`);
  });
}
// Memilih templat tugas menggunakan list

async function promptAddFromTemplates(): Promise<void> {
  const taskTemplates = [
    '💻 Belajar Coding TypeScript',
    '🏋️ Olahraga Pagi 30 Menit',
    '📚 Membaca Buku / Artikel Teknis',
    '🧹 Membersihkan Kamar Kerja',
    '🛒 Belanja Kebutuhan Mingguan',
    '☕ Istirahat / Me Time',
  ];

  const { selectedTask } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTask',
      message: '✍️ Pilih tugas yang ingin ditambahkan:',
      choices: taskTemplates,
    },
  ]);

  const newTodo = todoService.add({ task: selectedTask });
  console.log(`\n🎉 Sukses menambahkan tugas: "${newTodo.task}"`);
}

// Mengubah status tugas
async function promptToggle(): Promise<void> {
  const todos = todoService.getAll();
  if (todos.length === 0) {
    return console.log('\n⚠️ Tidak ada tugas untuk diubah statusnya.');
  }

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: '🔄 Pilih tugas untuk diubah statusnya (Selesai <-> Belum):',
      choices: todos.map((t) => ({
        name: `${t.completed ? '✅' : '⏳'} ${t.task}`,
        value: t.id,
      })),
    },
  ]);

  todoService.toggle(id);
  console.log('\n✨ Status tugas berhasil diperbarui!');
}

// Menghapus tugas

async function promptDelete(): Promise<void> {
  const todos = todoService.getAll();
  if (todos.length === 0) {
    console.log('\n⚠️ Tidak ada tugas untuk dihapus.'); mainMenu();
  }

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: '❌ Pilih tugas yang ingin dihapus secara permanen:',
      choices: todos.map((t) => ({
        name: `${t.completed ? '✅' : '⏳'} ${t.task}`,
        value: t.id,
      })),
    },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      type: 'list',
      name: 'confirm',
      message: 'Apakah Anda yakin ingin menghapus tugas ini?',
      choices: [
        { name: 'Ya, Hapus', value: true },
        { name: 'Tidak, Batalkan', value: false },
      ],
    },
  ]);

  if (confirm) {
    todoService.delete(id);
    console.log('\n🗑️ Tugas berhasil dihapus!');
  } else {
    console.log('\n❌ Penghapusan dibatalkan.');
  }
}

// Jalankan program utama

mainMenu();
