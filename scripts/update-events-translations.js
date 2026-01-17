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

// Імпортуємо дані з файлів
const { events2026 } = require('../src/data/events2026.ts');

const updateEvent = db.prepare(`
  UPDATE events 
  SET title_tr = COALESCE(?, title_tr),
      title_uk = COALESCE(?, title_uk),
      description_tr = COALESCE(?, description_tr),
      description_uk = COALESCE(?, description_uk),
      location_tr = COALESCE(?, location_tr),
      location_uk = COALESCE(?, location_uk),
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

async function updateEventsTranslations() {
  console.log('🚀 Starting events translations update...\n');
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const event of events2026) {
    try {
      const existingEvent = db.prepare('SELECT id FROM events WHERE id = ?').get(event.id);
      if (!existingEvent) {
        console.log(`⚠️  Event not found: ${event.title.ru} (id: ${event.id})`);
        skipped++;
        continue;
      }
      
      // Перевіряємо, чи потрібно оновлювати
      const currentEvent = db.prepare('SELECT title_tr, title_uk FROM events WHERE id = ?').get(event.id);
      if (currentEvent.title_tr && currentEvent.title_uk && event.title.tr && event.title.uk) {
        // Якщо переклади вже є, пропускаємо
        console.log(`⏭️  Skipping (translations exist): ${event.title.ru}`);
        skipped++;
        continue;
      }
      
      updateEvent.run(
        event.title.tr || null,
        event.title.uk || null,
        event.description?.tr || null,
        event.description?.uk || null,
        event.location?.tr || null,
        event.location?.uk || null,
        event.id
      );
      
      console.log(`✓ Updated translations: ${event.title.ru}`);
      updated++;
    } catch (error) {
      console.error(`✗ Failed to update: ${event.title.ru}`, error.message);
      errors++;
    }
  }
  
  console.log(`\n✅ Translations update completed!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

updateEventsTranslations()
  .then(() => {
    console.log('\n✨ Done!');
    db.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Update failed:', error);
    db.close();
    process.exit(1);
  });
