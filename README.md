# Estedilux Med - Сайт для навчання лікарів за кордоном

Двомовний веб-сайт для продажу освітніх медичних заходів за кордоном.

## 🚀 Технології

- **Next.js 15.5.4** - React фреймворк з SSR/SSG
- **React 19.2.0** - UI бібліотека
- **TypeScript** - Типізація коду
- **next-i18next** - Інтернаціоналізація (українська/англійська)

## 📁 Структура проекту

```
estedilux-med/
├── public/                 # Статичні файли
├── src/
│   ├── components/         # React компоненти
│   ├── pages/              # Next.js сторінки
│   ├── styles/             # Стилі
│   ├── lib/                # Утиліти
│   ├── types/              # TypeScript типи
│   └── config/             # Конфігурація
├── tsconfig.json           # TypeScript конфігурація
├── next.config.js          # Next.js конфігурація
└── package.json            # Залежності
```

## 🛠️ Встановлення та запуск

### Встановлення залежностей

```bash
npm install
```

### Запуск в режимі розробки

```bash
npm run dev
```

Додаток буде доступний за адресою: **http://localhost:3000**

### Збірка для продакшену

```bash
npm run build
npm start
```

### Перевірка типів

```bash
npm run type-check
```

## 🌍 Мови

- Українська (uk) - мова за замовчуванням
- Англійська (en)

## 📝 Особливості

- ⚡️ Швидка продуктивність з Next.js
- 🔍 SEO оптимізація
- 📱 Адаптивний дизайн
- 🌐 Двомовність (UK/EN)
- 💻 TypeScript для типобезпеки
- 🎨 Сучасний UI/UX
- 📱 Інтеграція з Telegram для отримання заявок

## 🔧 Налаштування змінних середовища

Створіть файл `.env.local` в корені проекту з наступними змінними:

```env
# Telegram Bot налаштування
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Monobank (оплата за події). Токен з https://api.monobank.ua/ або https://web.monobank.ua/
NEXT_PUBLIC_MONO_TOKEN=your_mono_merchant_token

# URL сайту (потрібен для redirectUrl та webHookUrl Mono)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Як отримати Telegram Bot Token та Chat ID:

1. **Створіть бота:**
   - Відкрийте [@BotFather](https://t.me/botfather) в Telegram
   - Надішліть команду `/newbot`
   - Дотримуйтесь інструкцій та отримайте токен бота

2. **Отримайте Chat ID групи:**
   - Додайте бота в групу, куди потрібно відправляти повідомлення
   - Відкрийте в браузері: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Знайдіть `chat.id` в відповіді (це ID групи)

Або використайте бота [@userinfobot](https://t.me/userinfobot) для отримання ID групи.

