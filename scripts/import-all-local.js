// Простий скрипт для локального імпорту - працює без ts-node
// Використовує eval для завантаження TypeScript модулів
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

// Шлях до бази даних
const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

// Ініціалізуємо БД
console.log('📦 Initializing database...\n');

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

try { db.exec('ALTER TABLE event_categories ADD COLUMN title_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN title_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN description_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN description_uk TEXT'); } catch (e) {}

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

try { db.exec('ALTER TABLE events ADD COLUMN title_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN title_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN description_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN description_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN location_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN location_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN published INTEGER DEFAULT 1'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN end_date TEXT'); } catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    content_ru TEXT NOT NULL,
    content_en TEXT NOT NULL,
    image TEXT,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

try { db.exec('ALTER TABLE blogs ADD COLUMN title_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE blogs ADD COLUMN title_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE blogs ADD COLUMN content_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE blogs ADD COLUMN content_uk TEXT'); } catch (e) {}

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

// Функція для завантаження TypeScript модулів через require з ts-node
function loadTSModule(modulePath) {
  const fullPath = path.join(process.cwd(), modulePath);
  
  // Спробуємо використати ts-node якщо він доступний
  try {
    // Реєструємо path mapping
    const tsConfigPaths = require('tsconfig-paths');
    const tsConfig = require('../tsconfig.json');
    const baseUrl = tsConfig.compilerOptions.baseUrl || '.';
    const paths = tsConfig.compilerOptions.paths || {};
    
    tsConfigPaths.register({
      baseUrl,
      paths,
    });
    
    require('ts-node').register({
      transpileOnly: true,
      compilerOptions: {
        module: 'commonjs',
        moduleResolution: 'node',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        target: 'ES2020',
        baseUrl: baseUrl,
        paths: paths,
      },
      typeCheck: false,
    });
    
    // Видаляємо кеш модуля
    delete require.cache[require.resolve(fullPath)];
    return require(fullPath);
  } catch (e) {
    console.error(`Failed to load ${modulePath} with ts-node:`, e.message);
    throw e;
  }
}

const createEventCategory = db.prepare(`
  INSERT INTO event_categories (id, title_ru, title_en, title_tr, title_uk, description_ru, description_en, description_tr, description_uk, subcategories, icon)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const createEvent = db.prepare(`
  INSERT INTO events (id, category_id, title_ru, title_en, title_tr, title_uk, description_ru, description_en, description_tr, description_uk, date, end_date, location_ru, location_en, location_tr, location_uk, price, duration, image, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const createBlog = db.prepare(`
  INSERT INTO blogs (id, title_ru, title_en, title_tr, title_uk, content_ru, content_en, content_tr, content_uk, image, date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Імпорт категорій
async function importEventCategories() {
  console.log('🚀 Importing event categories...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  try {
    const { eventCategories } = loadTSModule('src/data/eventCategories.ts');
    
    for (const category of eventCategories) {
      try {
        const existingCategory = db.prepare('SELECT id FROM event_categories WHERE id = ?').get(category.id);
        if (existingCategory) {
          console.log(`- Skipping existing category: ${category.title.ru}`);
          skipped++;
          continue;
        }
        
        const subcategoriesJson = JSON.stringify(category.subcategories);
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
        console.log(`✓ Imported category: ${category.title.ru}`);
        imported++;
      } catch (error) {
        console.error(`✗ Failed to import category: ${category.title.ru}`, error.message);
        errors++;
      }
    }
  } catch (error) {
    console.error('✗ Failed to load eventCategories:', error.message);
    errors++;
  }
  
  console.log(`\n✅ Categories import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}\n`);
}

// Імпорт подій
async function importEvents() {
  console.log('🚀 Importing events...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  try {
    const { events } = loadTSModule('src/data/events.ts');
    
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
        console.error(`✗ Failed to import event: ${event.title.ru}`, error.message);
        errors++;
      }
    }
  } catch (error) {
    console.error('✗ Failed to load events:', error.message);
    errors++;
  }
  
  console.log(`\n✅ Events import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}\n`);
}

// Імпорт подій 2026
async function importEvents2026() {
  console.log('🚀 Importing events 2026...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  try {
    const { events2026 } = loadTSModule('src/data/events2026.ts');
    
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
        console.error(`✗ Failed to import event 2026: ${event.title.ru}`, error.message);
        errors++;
      }
    }
  } catch (error) {
    console.error('✗ Failed to load events2026:', error.message);
    errors++;
  }
  
  console.log(`\n✅ Events 2026 import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}\n`);
}

// Імпорт блогів
async function importBlogs() {
  console.log('🚀 Importing blogs...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  try {
    const { blogPosts } = loadTSModule('src/data/blog.ts');
    
    for (const post of blogPosts) {
      try {
        const existingPost = db.prepare('SELECT id FROM blogs WHERE id = ?').get(post.id);
        if (existingPost) {
          console.log(`- Skipping existing blog: ${post.title.ru}`);
          skipped++;
          continue;
        }
        
        createBlog.run(
          post.id,
          post.title.ru,
          post.title.en,
          post.title.tr || null,
          post.title.uk || null,
          post.content.ru,
          post.content.en,
          post.content.tr || null,
          post.content.uk || null,
          post.image || null,
          post.date || null
        );
        console.log(`✓ Imported blog: ${post.title.ru}`);
        imported++;
      } catch (error) {
        console.error(`✗ Failed to import blog: ${post.title.ru}`, error.message);
        errors++;
      }
    }
  } catch (error) {
    console.error('✗ Failed to load blogs:', error.message);
    errors++;
  }
  
  console.log(`\n✅ Blogs import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}\n`);
}

// Головна функція
async function importAll() {
  try {
    await importEventCategories();
    await importEvents();
    await importEvents2026();
    await importBlogs();
    
    console.log('🎉 All imports completed successfully!');
    console.log(`\n📁 Database location: ${dbPath}`);
    console.log('💡 You can now copy this database file to your server!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

importAll();
