# Інструкції для деплою на сервер

## Команди для додавання подій, категорій та блогів з 4 мовами

### 1. Підключення до сервера
```bash
# SSH підключення (замініть на ваші дані)
ssh user@your-server.com
cd /path/to/estedilux_med
```

### 2. Оновлення коду з git
```bash
git pull origin main
```

### 3. Встановлення залежностей (якщо потрібно)
```bash
npm install
```

### 4. Імпорт категорій та подій (з підтримкою 4 мов)

**Варіант 1 (якщо ts-node працює):**
```bash
npm run import-events
```

**Варіант 2 (якщо є проблеми з ts-node):**
```bash
# Встановіть tsx (якщо ще не встановлено)
npm install -D tsx

# Або використайте спрощену версію для подій 2026
npm run import-events-2026
```

**Варіант 3 (якщо ts-node не працює):**
```bash
# Використайте npx tsx
npx tsx scripts/import-events-data.js
```

Ця команда:
- ✅ Імпортує категорії з підтримкою ru, en, tr, uk
- ✅ Імпортує події з підтримкою 4 мов
- ✅ Імпортує події 2026 з розкладу (15 подій)
- ✅ Оновлює іконки категорій

### 5. Імпорт блогів (з підтримкою 4 мов)
```bash
npm run import-blog
```

### 6. Оновлення перекладів для існуючих подій (опціонально)
```bash
# Оновлює переклади tr та uk для подій 2026
npm run update-events-translations
```

### 7. Перезапуск сервера
```bash
# Якщо використовується PM2
pm2 restart estedilux-med

# Або якщо використовується systemd
sudo systemctl restart estedilux-med

# Або просто перезапустіть Next.js
npm run build
npm run start
```

## Повна послідовність команд (скопіюйте та виконайте)

```bash
# 1. Підключення та навігація
cd /path/to/estedilux_med

# 2. Оновлення коду
git pull origin main

# 3. Встановлення залежностей (якщо потрібно)
npm install

# 4. Імпорт даних
npm run import-events
npm run import-blog

# 5. Оновлення перекладів (якщо потрібно)
npm run update-events-translations

# 6. Перезапуск
npm run build
pm2 restart estedilux-med  # або ваш спосіб перезапуску
```

## Що роблять скрипти:

### `npm run import-events`
- Імпортує категорії подій з `src/data/eventCategories.ts`
- Імпортує події з `src/data/events.ts`
- Імпортує події 2026 з `src/data/events2026.ts` (15 нових подій)
- Підтримує 4 мови: ru, en, tr, uk
- Оновлює іконки категорій

### `npm run import-blog`
- Імпортує блоги з `src/data/blog.ts`
- Підтримує 4 мови: ru, en, tr, uk

### `npm run update-events-translations`
- Оновлює переклади tr та uk для подій 2026
- Використовується, якщо потрібно додати переклади до існуючих подій

## Перевірка після імпорту

```bash
# Перевірте кількість подій в базі
sqlite3 data/admin.db "SELECT COUNT(*) FROM events;"

# Перевірте події 2026
sqlite3 data/admin.db "SELECT id, title_ru, date FROM events WHERE id >= 100 ORDER BY date;"

# Перевірте наявність перекладів
sqlite3 data/admin.db "SELECT id, title_ru, title_tr, title_uk FROM events WHERE id = 100;"
```

## Примітки:

- Скрипти автоматично пропускають існуючі записи (не перезаписують)
- Для нових записів автоматично додаються переклади tr та uk
- База даних знаходиться в `data/admin.db`
- Всі зміни зберігаються автоматично
