const Database = require('better-sqlite3');
const path = require('path');

// Шлях до бази даних
const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!require('fs').existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

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

async function updateCategoryIcons() {
  console.log('🚀 Starting category icons update...\n');

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
        console.log(`  New icon: ${imagePath}\n`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: "${category.title_ru}" (already has correct icon)\n`);
        skipped++;
      }
    } else {
      console.log(`⚠️  Not found in map: "${category.title_ru}" (id: ${category.id})\n`);
      notFound++;
    }
  }

  console.log(`\n✅ Update completed!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Not found in map: ${notFound}`);

  db.close();
}

// Запускаємо оновлення
updateCategoryIcons()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Update failed:', error);
    process.exit(1);
  });

