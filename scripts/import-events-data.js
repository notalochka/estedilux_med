// Реєструємо ts-node для підтримки TypeScript
let tsNodeRegistered = false;

try {
  const tsNode = require('ts-node');
  
  tsNode.register({
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
      moduleResolution: 'node',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      target: 'ES2020',
    },
    typeCheck: false,
    files: false,
    ignore: ['(?:^|/)node_modules/'],
  });
  
  tsNodeRegistered = true;
  console.log('✓ ts-node registered successfully');
} catch (error) {
  console.error('❌ Failed to register ts-node:', error.message);
  console.error('   Trying to use tsx or alternative method...');
  
  // Спробуємо використати tsx якщо він встановлений
  try {
    require('tsx/cjs/register');
    tsNodeRegistered = true;
    console.log('✓ Using tsx instead');
  } catch (e) {
    console.error('❌ tsx also not available');
    console.error('   Please install: npm install -D tsx');
    console.error('   Or use: npx tsx scripts/import-events-data.js');
    process.exit(1);
  }
}

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

// Додаємо колонки для турецької та української мов для категорій
try {
  db.exec('ALTER TABLE event_categories ADD COLUMN title_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE event_categories ADD COLUMN title_uk TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE event_categories ADD COLUMN description_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE event_categories ADD COLUMN description_uk TEXT');
} catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ru TEXT,
    description_en TEXT,
    date TEXT,
    end_date TEXT,
    location_ru TEXT,
    location_en TEXT,
    price REAL,
    duration TEXT,
    image TEXT,
    published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES event_categories(id)
  )
`);

// Додаємо колонки для турецької та української мов для подій
try {
  db.exec('ALTER TABLE events ADD COLUMN title_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN title_uk TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN description_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN description_uk TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN location_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN location_uk TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN published INTEGER DEFAULT 1');
} catch (e) {}
try {
  db.exec('ALTER TABLE events ADD COLUMN end_date TEXT');
} catch (e) {}

// Імпортуємо дані з файлів
let eventCategories = [];
let events = [];
let events2026 = [];

try {
  const eventCategoriesModule = require('../src/data/eventCategories.ts');
  eventCategories = eventCategoriesModule.eventCategories || [];
} catch (error) {
  console.error('❌ Failed to load eventCategories:', error.message);
  process.exit(1);
}

try {
  const eventsModule = require('../src/data/events.ts');
  events = eventsModule.events || [];
} catch (error) {
  console.warn('⚠️  Failed to load events.ts:', error.message);
}

try {
  const events2026Module = require('../src/data/events2026.ts');
  events2026 = events2026Module.events2026 || [];
} catch (error) {
  console.warn('⚠️  events2026.ts not found or has errors, skipping 2026 events import');
  console.warn('   Error:', error.message);
}

// Мапінг назв категорій на назви фото
const categoryToImageMap = {
  'Эстетическая медицина и дерматология': '/categories/Cosmetology.jpg',
  'Анатомия и Cadaver программы': '/categories/Cadaver.jpg',
  'Гинекология и репродуктология': '/categories/Gynecology.jpg',
  'Стоматология и челюстно-лицевая хирургия': '/categories/Dentistry.jpg',
  'Пластическая и реконструктивная хирургия': '/categories/Plastic_surgery.jpg',
  'Общая и малоинвазивная хирургия': '/categories/minimallyinvasive_surgery.jpg',
  'Ортопедия, травматология и спортивная медицина': '/categories/Orthopedics.jpg',
  'Неврология и нейрохирургия': '/categories/Neurology.jpg',
  'Кардиология и кардиохирургия': '/categories/Cardiology.jpg',
  'Терапевтические направления': '/categories/Therapy.jpg',
  'Радиология и УЗ-диагностика': '/categories/Radiology.jpg',
  'Педиатрия': '/categories/Pediatrics.jpg',
  'Урология': '/categories/Urology.jpg',
  'Онкология': '/categories/Oncology.jpg',
  'Офтальмология': '/categories/Ophthalmology.jpg',
  'Инфекционные заболевания': '/categories/Infectious_diseases.jpg',
  'Лабораторная медицина и генетика': '/categories/genetics.jpg',
  'Психиатрия и психотерапия': '/categories/Psychiatry.jpg',
  'Паллиативная медицина': '/categories/Palliative.jpg',
  'Специальные программы Estedilux Med': '/categories/Special_programs.jpg',
};

const createEventCategory = db.prepare(`
  INSERT INTO event_categories (id, title_ru, title_en, title_tr, title_uk, description_ru, description_en, description_tr, description_uk, subcategories, icon)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const createEvent = db.prepare(`
  INSERT INTO events (id, category_id, title_ru, title_en, title_tr, title_uk, description_ru, description_en, description_tr, description_uk, date, end_date, location_ru, location_en, location_tr, location_uk, price, duration, image, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      // Використовуємо мапінг для іконки, якщо вона не вказана в даних
      const iconPath = category.icon || categoryToImageMap[category.title.ru] || null;
      
      createEventCategory.run(
        category.id,
        category.title.ru,
        category.title.en,
        category.title.tr || null,
        category.title.uk || null,
        category.description.ru,
        category.description.en,
        category.description.tr || null,
        category.description.uk || null,
        subcategoriesJson,
        iconPath
      );
      console.log(`✓ Imported category: ${category.title.ru}${iconPath ? ` (icon: ${iconPath})` : ''}`);
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
        event.title.tr || null,
        event.title.uk || null,
        event.description?.ru || null,
        event.description?.en || null,
        event.description?.tr || null,
        event.description?.uk || null,
        event.date || null,
        event.endDate || null,
        event.location?.ru || null,
        event.location?.en || null,
        event.location?.tr || null,
        event.location?.uk || null,
        event.price || null,
        event.duration || null,
        event.image || null,
        event.published !== false ? 1 : 0
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

async function updateCategoryIcons() {
  console.log('\n🚀 Starting category icons update...');

  // Отримуємо всі категорії
  const categories = db.prepare('SELECT id, title_ru, icon FROM event_categories ORDER BY id').all();

  console.log(`Found ${categories.length} categories in database\n`);

  // Підготовлюємо SQL запит для оновлення
  const updateIcon = db.prepare(`
    UPDATE event_categories 
    SET icon = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  // Оновлюємо кожну категорію
  for (const category of categories) {
    const imagePath = categoryToImageMap[category.title_ru];

    if (imagePath) {
      if (category.icon !== imagePath) {
        updateIcon.run(imagePath, category.id);
        console.log(`✓ Updated: "${category.title_ru}"`);
        console.log(`  Old icon: ${category.icon || '(empty)'}`);
        console.log(`  New icon: ${imagePath}`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: "${category.title_ru}" (already has correct icon)`);
        skipped++;
      }
    } else {
      console.log(`⚠️  Not found in map: "${category.title_ru}" (id: ${category.id})`);
      notFound++;
    }
  }

  console.log(`\n✅ Icons update completed!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Not found in map: ${notFound}`);
}

async function importEvents2026() {
  console.log('\n🚀 Starting events 2026 import...');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const event of events2026) {
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
        event.title.tr || null,
        event.title.uk || null,
        event.description?.ru || null,
        event.description?.en || null,
        event.description?.tr || null,
        event.description?.uk || null,
        event.date || null,
        event.endDate || null,
        event.location?.ru || null,
        event.location?.en || null,
        event.location?.tr || null,
        event.location?.uk || null,
        event.price || null,
        event.duration || null,
        event.image || null,
        event.published !== false ? 1 : 0
      );
      console.log(`✓ Imported event 2026: ${event.title.ru}`);
      imported++;
    } catch (error) {
      console.error(`✗ Failed to import event 2026: ${event.title.ru}`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Events 2026 import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

async function importAll() {
  try {
    await importEventCategories();
    await updateCategoryIcons();
    await importEvents();
    await importEvents2026();
    console.log('\n🎉 All imports completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

importAll();

