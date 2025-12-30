const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

console.log('🗑️  Clearing database...\n');

try {
  // Видаляємо дані з таблиць (зберігаємо структуру)
  db.exec('DELETE FROM event_registrations');
  console.log('✓ Cleared event_registrations');
  
  db.exec('DELETE FROM events');
  console.log('✓ Cleared events');
  
  db.exec('DELETE FROM event_categories');
  console.log('✓ Cleared event_categories');
  
  db.exec('DELETE FROM blogs');
  console.log('✓ Cleared blogs');
  
  // Не видаляємо users, щоб не втратити адмінів
  // db.exec('DELETE FROM users');
  
  console.log('\n✅ Database cleared successfully!');
} catch (error) {
  console.error('❌ Error clearing database:', error);
  process.exit(1);
} finally {
  db.close();
}

