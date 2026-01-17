const fs = require('fs');
const path = require('path');

// Мапінг старих назв на нові
const renameMap = {
  // Кореневі фото
  'IMAGE 2026-01-11 22:22:16.jpg': 'about_partner_1.jpg',
  'IMAGE 2026-01-11 22:22:58.jpg': 'about_partner_2.jpg',
  'IMAGE 2026-01-11 22:23:10.jpg': 'about_partner_3.jpg',
  'IMAGE 2026-01-11 22:23:20.jpg': 'about_partner_4.jpg',
  'IMAGE 2026-01-11 22:23:28.jpg': 'about_service_1.jpg',
  'IMAGE 2026-01-11 22:23:37.jpg': 'about_service_2.jpg',
  'photo1.jpg': 'about_team_main.jpg',
  'photo2.jpg': 'about_team_2.jpg',
  'photo3.jpg': 'about_team_3.jpg',
  'photo4.jpg': 'about_team_4.jpg',
  'photo5.jpg': 'about_team_5.jpg',
  
  // about/photo
  'about/photo1.jpg': 'about/service_1.jpg',
  'about/photo2.jpg': 'about/service_2.jpg',
  'about/photo3.jpg': 'about/service_3.jpg',
  'about/photo4.jpg': 'about/service_4.jpg',
  'about/photo5.jpg': 'about/service_5.jpg',
  'about/photo6.jpg': 'about/service_6.jpg',
  'about/photo7.jpg': 'about/service_7.jpg',
  
  // categories/photo
  'categories/photo1.jpg': 'categories/category_fallback_1.jpg',
  'categories/photo5.jpg': 'categories/category_fallback_2.jpg',
  'categories/photo6.jpg': 'categories/category_fallback_3.jpg',
  'categories/photo7.jpg': 'categories/category_fallback_4.jpg',
};

// Мапінг для оновлення в коді
const codeUpdateMap = {
  '/photo1.jpg': '/about_team_main.jpg',
  '/photo2.jpg': '/about_team_2.jpg',
  '/photo3.jpg': '/about_team_3.jpg',
  '/photo4.jpg': '/about_team_4.jpg',
  '/photo5.jpg': '/about_team_5.jpg',
  '/about/photo1.jpg': '/about/service_1.jpg',
  '/about/photo2.jpg': '/about/service_2.jpg',
  '/about/photo3.jpg': '/about/service_3.jpg',
  '/about/photo4.jpg': '/about/service_4.jpg',
  '/about/photo5.jpg': '/about/service_5.jpg',
  '/about/photo6.jpg': '/about/service_6.jpg',
  '/about/photo7.jpg': '/about/service_7.jpg',
  '/categories/photo1.jpg': '/categories/category_fallback_1.jpg',
  '/categories/photo5.jpg': '/categories/category_fallback_2.jpg',
  '/categories/photo6.jpg': '/categories/category_fallback_3.jpg',
  '/categories/photo7.jpg': '/categories/category_fallback_4.jpg',
  '/categories/photo${(index % 7) + 1}.jpg': '/categories/category_fallback_${(index % 4) + 1}.jpg',
  '`/categories/photo${(index % 7) + 1}.jpg`': '`/categories/category_fallback_${(index % 4) + 1}.jpg`',
};

function renameFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  let renamedCount = 0;
  
  console.log('🔄 Початок перейменування файлів...\n');
  
  // Перейменування кореневих файлів
  for (const [oldName, newName] of Object.entries(renameMap)) {
    if (!oldName.includes('/')) {
      const oldPath = path.join(publicDir, oldName);
      const newPath = path.join(publicDir, newName);
      
      if (fs.existsSync(oldPath)) {
        try {
          fs.renameSync(oldPath, newPath);
          console.log(`✅ ${oldName} -> ${newName}`);
          renamedCount++;
        } catch (error) {
          console.error(`❌ Помилка при перейменуванні ${oldName}:`, error.message);
        }
      } else {
        console.log(`⚠️  Файл не знайдено: ${oldName}`);
      }
    }
  }
  
  // Перейменування файлів в підпапках
  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    if (oldPath.includes('/')) {
      const fullOldPath = path.join(publicDir, oldPath);
      const fullNewPath = path.join(publicDir, newPath);
      
      // Створюємо директорію, якщо її немає
      const newDir = path.dirname(fullNewPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }
      
      if (fs.existsSync(fullOldPath)) {
        try {
          fs.renameSync(fullOldPath, fullNewPath);
          console.log(`✅ ${oldPath} -> ${newPath}`);
          renamedCount++;
        } catch (error) {
          console.error(`❌ Помилка при перейменуванні ${oldPath}:`, error.message);
        }
      } else {
        console.log(`⚠️  Файл не знайдено: ${oldPath}`);
      }
    }
  }
  
  console.log(`\n✨ Перейменовано ${renamedCount} файлів\n`);
  console.log('📝 Тепер потрібно оновити посилання в коді. Виконайте:');
  console.log('   npm run update-image-references\n');
}

if (require.main === module) {
  renameFiles();
}

module.exports = { renameMap, codeUpdateMap };
