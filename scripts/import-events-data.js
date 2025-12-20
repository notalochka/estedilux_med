// Реєструємо ts-node для підтримки TypeScript
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    resolveJsonModule: true,
    skipLibCheck: true,
  },
});

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Шлях до бази даних
const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

// Ініціалізуємо БД (створюємо таблиці якщо їх немає)
db.exec(`
  CREATE TABLE IF NOT EXISTS event_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    subcategories TEXT NOT NULL,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ru TEXT,
    description_en TEXT,
    date TEXT,
    location_ru TEXT,
    location_en TEXT,
    price REAL,
    duration TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES event_categories(id)
  )
`);

// Імпортуємо дані з файлів
const { eventCategories } = require('../src/data/eventCategories');
const { events } = require('../src/data/events');

const createEventCategory = db.prepare(`
  INSERT INTO event_categories (id, title_ru, title_en, description_ru, description_en, subcategories, icon)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const createEvent = db.prepare(`
  INSERT INTO events (id, category_id, title_ru, title_en, description_ru, description_en, date, location_ru, location_en, price, duration, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

async function importEventCategories() {
  console.log('🚀 Starting event categories import...');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const category of eventCategories) {
    try {
      const existingCategory = db.prepare('SELECT id FROM event_categories WHERE id = ?').get(category.id);
      if (existingCategory) {
        console.log(`- Skipping existing category: ${category.title.ru}`);
        skipped++;
        continue;
      }
      
      const subcategoriesJson = JSON.stringify(category.subcategories);
      
      createEventCategory.run(
        category.id,
        category.title.ru,
        category.title.en,
        category.description.ru,
        category.description.en,
        subcategoriesJson,
        category.icon || null
      );
      console.log(`✓ Imported category: ${category.title.ru}`);
      imported++;
    } catch (error) {
      console.error(`✗ Failed to import category: ${category.title.ru}`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Categories import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

async function importEvents() {
  console.log('\n🚀 Starting events import...');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const event of events) {
    try {
      const existingEvent = db.prepare('SELECT id FROM events WHERE id = ?').get(event.id);
      if (existingEvent) {
        console.log(`- Skipping existing event: ${event.title.ru}`);
        skipped++;
        continue;
      }
      
      createEvent.run(
        event.id,
        event.categoryId,
        event.title.ru,
        event.title.en,
        event.description?.ru || null,
        event.description?.en || null,
        event.date || null,
        event.location?.ru || null,
        event.location?.en || null,
        event.price || null,
        event.duration || null,
        event.image || null
      );
      console.log(`✓ Imported event: ${event.title.ru}`);
      imported++;
    } catch (error) {
      console.error(`✗ Failed to import event: ${event.title.ru}`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Events import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

async function importAll() {
  try {
    await importEventCategories();
    await importEvents();
    console.log('\n🎉 All imports completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

importAll();

