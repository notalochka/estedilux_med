# Виправлення проблем імпорту на сервері

## Проблема 1: FOREIGN KEY constraint failed

**Причина:** Категорії подій не імпортовані в базу даних перед імпортом подій 2026.

**Рішення:**

```bash
# 1. Спочатку імпортуйте категорії та основні події
npm run import-events

# Якщо ts-node не працює, використайте tsx:
npm install -D tsx
npx tsx scripts/import-events-data.js

# 2. Потім імпортуйте події 2026
npm run import-events-2026
```

## Проблема 2: ts-node помилки

**Причина:** Конфлікт версій або неправильна конфігурація ts-node.

**Рішення:**

### Варіант 1: Використати tsx (рекомендовано)
```bash
npm install -D tsx
npx tsx scripts/import-events-data.js
npx tsx scripts/import-blog-data.js
```

### Варіант 2: Оновити ts-node
```bash
npm install -D ts-node@latest
npm run import-events
```

### Варіант 3: Використати спрощену версію (тільки події 2026)
```bash
# Ця версія не потребує ts-node
npm run import-events-2026
```

## Повна послідовність імпорту на сервері

```bash
# 1. Встановити tsx (якщо ще не встановлено)
npm install -D tsx

# 2. Імпортувати категорії та основні події
npx tsx scripts/import-events-data.js

# 3. Імпортувати події 2026
npm run import-events-2026

# 4. Імпортувати блоги
npx tsx scripts/import-blog-data.js

# 5. Перевірити дані
node scripts/view-db-data.js
```

## Перевірка категорій в базі

Якщо виникає помилка FOREIGN KEY, перевірте наявність категорій:

```bash
# Створіть простий скрипт для перевірки
node -e "
const Database = require('better-sqlite3');
const db = new Database('./data/admin.db');
const categories = db.prepare('SELECT id, title_ru FROM event_categories').all();
console.log('Categories in database:');
categories.forEach(c => console.log(\`  ID \${c.id}: \${c.title_ru}\`));
db.close();
"
```

## Оновлення package.json

Додайте в `package.json`:

```json
{
  "scripts": {
    "import-events": "tsx scripts/import-events-data.js",
    "import-blog": "tsx scripts/import-blog-data.js",
    "import-events-2026": "node scripts/import-events-simple.js"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  }
}
```

Потім:
```bash
npm install
npm run import-events
npm run import-events-2026
npm run import-blog
```
