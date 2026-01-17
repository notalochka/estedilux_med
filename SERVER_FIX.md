# Виправлення проблеми з ts-node на сервері

## Проблема
```
TypeError: host.fileExists is not a function
```

## Рішення

### Варіант 1: Встановити tsx (рекомендовано)
```bash
npm install -D tsx
npx tsx scripts/import-events-data.js
```

### Варіант 2: Використати спрощену версію для подій 2026
```bash
npm run import-events-2026
```

### Варіант 3: Оновити ts-node
```bash
npm install -D ts-node@latest
npm run import-events
```

### Варіант 4: Використати Node.js з підтримкою ESM
```bash
node --loader ts-node/esm scripts/import-events-data.js
```

## Швидке виправлення на сервері

```bash
# 1. Встановити tsx
npm install -D tsx

# 2. Використати для імпорту
npx tsx scripts/import-events-data.js

# Або оновити package.json:
# "import-events": "tsx scripts/import-events-data.js"
```

## Альтернатива: Використати спрощену версію

Якщо ts-node не працює, використайте спрощену версію, яка імпортує тільки події 2026:

```bash
npm run import-events-2026
```

Ця версія не потребує ts-node і працює з чистим Node.js.
