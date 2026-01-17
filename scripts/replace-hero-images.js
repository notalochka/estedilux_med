const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

// Мапінг нових файлів на старі
const replacements = {
  'IMAGE 2026-01-17 16:32:17.jpg': 'main_hero.jpg', // Заголовна шапка головної сторінки
  'IMAGE 2026-01-17 16:32:32.jpg': 'about_main.jpg', // Про компанію
  'IMAGE 2026-01-17 16:32:48.jpg': 'events_hero.jpg', // Події
  'IMAGE 2026-01-17 16:33:06.jpg': 'directions_hero.jpg', // Напрямки
  'IMAGE 2026-01-17 16:33:15.jpg': 'blog_main.jpg', // Блог
  'IMAGE 2026-01-17 16:33:22.jpg': 'contact_hero.jpg', // Контакти
};

console.log('🔄 Початок заміни фото...\n');

let replacedCount = 0;
let renamedCount = 0;

// Спочатку створюємо резервні копії старих файлів
console.log('📦 Створення резервних копій старих файлів...');
for (const [newFile, oldFile] of Object.entries(replacements)) {
  const oldPath = path.join(publicDir, oldFile);
  const backupPath = path.join(publicDir, `${oldFile}.backup`);
  
  if (fs.existsSync(oldPath)) {
    try {
      fs.copyFileSync(oldPath, backupPath);
      console.log(`✅ Створено резервну копію: ${oldFile}.backup`);
    } catch (error) {
      console.error(`❌ Помилка при створенні резервної копії ${oldFile}:`, error.message);
    }
  }
}

console.log('\n🔄 Заміна файлів...\n');

// Замінюємо старі файли новими
for (const [newFile, oldFile] of Object.entries(replacements)) {
  const newFilePath = path.join(publicDir, newFile);
  const oldFilePath = path.join(publicDir, oldFile);
  
  if (!fs.existsSync(newFilePath)) {
    console.log(`⚠️  Новий файл не знайдено: ${newFile}`);
    continue;
  }
  
  try {
    // Видаляємо старий файл, якщо він існує
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
      console.log(`🗑️  Видалено старий файл: ${oldFile}`);
    }
    
    // Копіюємо новий файл з новою назвою
    fs.copyFileSync(newFilePath, oldFilePath);
    console.log(`✅ Замінено: ${oldFile} ← ${newFile}`);
    replacedCount++;
    
    // Видаляємо новий файл зі старою назвою
    fs.unlinkSync(newFilePath);
    console.log(`🗑️  Видалено тимчасовий файл: ${newFile}`);
    renamedCount++;
  } catch (error) {
    console.error(`❌ Помилка при заміні ${oldFile}:`, error.message);
  }
}

console.log(`\n✨ Завершено!`);
console.log(`   - Замінено файлів: ${replacedCount}`);
console.log(`   - Видалено тимчасових файлів: ${renamedCount}`);
console.log(`\n💡 Резервні копії збережено з розширенням .backup`);
console.log(`   Якщо все працює правильно, можете видалити їх вручну.`);
