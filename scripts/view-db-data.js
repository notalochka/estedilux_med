const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ База даних не знайдена:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

console.log('\n' + '='.repeat(80));
console.log('📊 ЗМІСТ БАЗИ ДАНИХ');
console.log('='.repeat(80) + '\n');

try {
  // 1. БЛОГ-ПОСТИ
  console.log('📝 БЛОГ-ПОСТИ');
  console.log('-'.repeat(80));
  const blogs = db.prepare('SELECT * FROM blogs ORDER BY date DESC, created_at DESC').all();
  
  if (blogs.length === 0) {
    console.log('   ⚠️  Блог-пости відсутні в базі даних\n');
  } else {
    console.log(`   Всього записів: ${blogs.length}\n`);
    blogs.forEach((blog, index) => {
      const publishedStatus = blog.published === 1 ? '✅ ОПУБЛІКОВАНО' : '❌ НЕ ОПУБЛІКОВАНО';
      console.log(`   ${index + 1}. ID: ${blog.id} | ${publishedStatus} | published = ${blog.published}`);
      console.log(`      Дата: ${blog.date}`);
      console.log(`      Заголовок (RU): ${blog.title_ru}`);
      console.log(`      Заголовок (EN): ${blog.title_en}`);
      console.log(`      Зображення: ${blog.image}`);
      console.log(`      Контент (RU): ${blog.content_ru.substring(0, 100)}...`);
      console.log(`      Створено: ${blog.created_at} | Оновлено: ${blog.updated_at}`);
      console.log('');
    });
  }

  // 2. КАТЕГОРІЇ ПОДІЙ
  console.log('📂 КАТЕГОРІЇ ПОДІЙ');
  console.log('-'.repeat(80));
  const categories = db.prepare('SELECT * FROM event_categories ORDER BY id ASC').all();
  
  if (categories.length === 0) {
    console.log('   ⚠️  Категорії відсутні в базі даних\n');
  } else {
    console.log(`   Всього категорій: ${categories.length}\n`);
    categories.forEach((category, index) => {
      console.log(`   ${index + 1}. ID: ${category.id}`);
      console.log(`      Заголовок (RU): ${category.title_ru}`);
      console.log(`      Заголовок (EN): ${category.title_en}`);
      console.log(`      Опис (RU): ${category.description_ru.substring(0, 100)}...`);
      console.log(`      Іконка: ${category.icon || '(не вказано)'}`);
      console.log(`      Створено: ${category.created_at}`);
      console.log('');
    });
  }

  // 3. ПОДІЇ
  console.log('📅 ПОДІЇ');
  console.log('-'.repeat(80));
  const events = db.prepare('SELECT * FROM events ORDER BY date ASC, created_at ASC').all();
  
  if (events.length === 0) {
    console.log('   ⚠️  Події відсутні в базі даних\n');
  } else {
    console.log(`   Всього подій: ${events.length}\n`);
    events.forEach((event, index) => {
      const publishedStatus = event.published === 1 ? '✅ ОПУБЛІКОВАНО' : '❌ НЕ ОПУБЛІКОВАНО';
      console.log(`   ${index + 1}. ID: ${event.id} | ${publishedStatus} | published = ${event.published || 'NULL'}`);
      console.log(`      ID Категорії: ${event.category_id}`);
      console.log(`      Дата: ${event.date || '(не вказано)'}`);
      console.log(`      Заголовок (RU): ${event.title_ru}`);
      console.log(`      Заголовок (EN): ${event.title_en}`);
      if (event.description_ru) {
        console.log(`      Опис (RU): ${event.description_ru.substring(0, 100)}...`);
      }
      if (event.location_ru) {
        console.log(`      Місце (RU): ${event.location_ru}`);
      }
      if (event.price !== null) {
        console.log(`      Ціна: ${event.price}`);
      }
      if (event.duration) {
        console.log(`      Тривалість: ${event.duration}`);
      }
      if (event.image) {
        console.log(`      Зображення: ${event.image}`);
      }
      console.log(`      Створено: ${event.created_at}`);
      console.log('');
    });
  }

  // 4. РЕЄСТРАЦІЇ НА ПОДІЇ
  console.log('📋 РЕЄСТРАЦІЇ НА ПОДІЇ');
  console.log('-'.repeat(80));
  const registrations = db.prepare('SELECT * FROM event_registrations ORDER BY created_at DESC').all();
  
  if (registrations.length === 0) {
    console.log('   ℹ️  Реєстрації відсутні\n');
  } else {
    console.log(`   Всього реєстрацій: ${registrations.length}\n`);
    registrations.forEach((reg, index) => {
      console.log(`   ${index + 1}. ID: ${reg.id}`);
      console.log(`      ID Події: ${reg.event_id}`);
      console.log(`      Ім'я: ${reg.user_name}`);
      console.log(`      Email: ${reg.user_email}`);
      console.log(`      Телефон: ${reg.user_phone}`);
      console.log(`      Спеціальність: ${reg.specialty || '(не вказано)'}`);
      console.log(`      Тип оплати: ${reg.payment_type}`);
      console.log(`      Сума: ${reg.amount} USD`);
      console.log(`      Order Reference: ${reg.order_reference}`);
      console.log(`      Transaction ID: ${reg.transaction_id || '(не вказано)'}`);
      console.log(`      Статус: ${reg.status}`);
      console.log(`      Створено: ${reg.created_at}`);
      console.log(`      Оплачено: ${reg.paid_at || '(ще не оплачено)'}`);
      console.log('');
    });
  }

  // 5. СТАТИСТИКА
  console.log('📈 СТАТИСТИКА');
  console.log('-'.repeat(80));
  
  const totalBlogs = db.prepare('SELECT COUNT(*) as count FROM blogs').get();
  const publishedBlogs = db.prepare('SELECT COUNT(*) as count FROM blogs WHERE published = 1').get();
  const unpublishedBlogs = db.prepare('SELECT COUNT(*) as count FROM blogs WHERE published = 0 OR published IS NULL').get();
  
  const totalEvents = db.prepare('SELECT COUNT(*) as count FROM events').get();
  const publishedEvents = db.prepare('SELECT COUNT(*) as count FROM events WHERE published = 1').get();
  const unpublishedEvents = db.prepare('SELECT COUNT(*) as count FROM events WHERE published = 0 OR published IS NULL').get();
  
  const totalCategories = db.prepare('SELECT COUNT(*) as count FROM event_categories').get();
  const totalRegistrations = db.prepare('SELECT COUNT(*) as count FROM event_registrations').get();
  
  console.log(`   Блог-пости: ${totalBlogs.count} загалом | ${publishedBlogs.count} опубліковано | ${unpublishedBlogs.count} не опубліковано`);
  console.log(`   Події: ${totalEvents.count} загалом | ${publishedEvents.count} опубліковано | ${unpublishedEvents.count} не опубліковано`);
  console.log(`   Категорії подій: ${totalCategories.count}`);
  console.log(`   Реєстрації на події: ${totalRegistrations.count}`);
  console.log('');

  // 6. ПЕРЕВІРКА ПРОБЛЕМ
  console.log('🔍 ДІАГНОСТИКА');
  console.log('-'.repeat(80));
  
  if (unpublishedBlogs.count > 0) {
    console.log(`   ⚠️  Знайдено ${unpublishedBlogs.count} неопублікованих блог-постів (published = 0 або NULL)`);
    console.log('      Ці пости не будуть відображатися на публічному сайті!\n');
  } else {
    console.log('   ✅ Всі блог-пости опубліковані\n');
  }
  
  if (unpublishedEvents.count > 0) {
    console.log(`   ⚠️  Знайдено ${unpublishedEvents.count} неопублікованих подій (published = 0 або NULL)`);
    console.log('      Ці події не будуть відображатися на публічному сайті!\n');
  } else {
    console.log('   ✅ Всі події опубліковані\n');
  }
  
  if (totalBlogs.count === 0 && totalEvents.count === 0) {
    console.log('   ⚠️  База даних порожня!');
    console.log('      Запустіть скрипти імпорту:');
    console.log('         node scripts/import-blog-data.js');
    console.log('         node scripts/import-events-data.js\n');
  }

  console.log('='.repeat(80));
  console.log('✅ Перегляд завершено\n');

} catch (error) {
  console.error('❌ Помилка при читанні бази даних:', error.message);
  console.error(error.stack);
} finally {
  db.close();
}

