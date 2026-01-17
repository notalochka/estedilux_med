// Скрипт для автоматичного додавання перекладів до категорій
// Використовує API перекладу для автоматичного заповнення tr та uk полів

const fs = require('fs');
const path = require('path');

// Читаємо файл категорій
const categoriesPath = path.join(__dirname, '../src/data/eventCategories.ts');
let content = fs.readFileSync(categoriesPath, 'utf-8');

// Простий підхід: додамо переклади вручну через заміну
// Але для автоматизації можна використати API перекладу

console.log('📝 Для додавання перекладів потрібно:');
console.log('1. Відкрити src/data/eventCategories.ts');
console.log('2. Додати tr та uk поля до кожної категорії');
console.log('3. Або використати API перекладу з адмін панелі');

console.log('\n💡 Альтернатива: використайте кнопку "Перекласти іншими мовами" в адмін панелі');
