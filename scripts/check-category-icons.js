const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

const categories = db.prepare('SELECT id, title_ru, icon FROM event_categories ORDER BY id').all();

console.log('Перевірка оновлених категорій:\n');
categories.forEach(cat => {
  console.log(`${cat.id}. ${cat.title_ru.substring(0, 50)}`);
  console.log(`   Icon: ${cat.icon || '(empty)'}\n`);
});

db.close();


