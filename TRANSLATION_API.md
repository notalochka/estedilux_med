# API для автоматичного перекладу

Система автоматичного перекладу для категорій та подій Estedilux Med.

## Доступні endpoints

### 1. Переклад однієї події
**POST** `/api/translate/event`

**Body:**
```json
{
  "eventId": 1,
  "languages": ["tr", "uk"] // опціонально, за замовчуванням ["tr", "uk"]
}
```

**Відповідь:**
```json
{
  "success": true,
  "message": "Translations generated successfully",
  "translations": {
    "title_tr": "Перекладений заголовок",
    "title_uk": "Перекладений заголовок",
    "description_tr": "...",
    "description_uk": "...",
    "location_tr": "...",
    "location_uk": "..."
  }
}
```

### 2. Переклад однієї категорії
**POST** `/api/translate/category`

**Body:**
```json
{
  "categoryId": 1,
  "languages": ["tr", "uk"] // опціонально
}
```

**Відповідь:**
```json
{
  "success": true,
  "message": "Translations generated successfully",
  "translations": {
    "title_tr": "...",
    "title_uk": "...",
    "description_tr": "...",
    "description_uk": "...",
    "subcategories": "[{...}]" // JSON string з перекладеними підкатегоріями
  }
}
```

### 3. Масовий переклад всіх подій
**POST** `/api/translate/events-batch`

**Body:**
```json
{
  "languages": ["tr", "uk"] // опціонально
}
```

**Відповідь:**
```json
{
  "success": true,
  "message": "Translated 15 events",
  "translatedCount": 15,
  "totalEvents": 20,
  "errors": [] // якщо є помилки
}
```

### 4. Масовий переклад всіх категорій
**POST** `/api/translate/categories-batch`

**Body:**
```json
{
  "languages": ["tr", "uk"] // опціонально
}
```

**Відповідь:**
```json
{
  "success": true,
  "message": "Translated 10 categories",
  "translatedCount": 10,
  "totalCategories": 10,
  "errors": []
}
```

## Примітки

- Всі endpoints вимагають автентифікації (тільки для адмінів)
- Переклади генеруються тільки для відсутніх мов (не перезаписують існуючі)
- Використовується безкоштовний LibreTranslate API
- Між запитами додається затримка 100ms, щоб не перевантажити API

## Приклад використання

```javascript
// Перекласти одну подію
const response = await fetch('/api/translate/event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // для передачі auth token
  body: JSON.stringify({
    eventId: 1,
    languages: ['tr', 'uk']
  })
});

// Перекласти всі категорії
const response = await fetch('/api/translate/categories-batch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    languages: ['tr', 'uk']
  })
});
```
