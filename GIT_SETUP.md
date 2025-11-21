# Інструкція з підключення проекту до Git

## Крок 1: Встановлення Git (якщо ще не встановлено)

Якщо Git не встановлений на вашому комп'ютері:

1. Завантажте Git з офіційного сайту: https://git-scm.com/download/win
2. Встановіть Git, дотримуючись інструкцій установщика
3. Перезапустіть термінал/командний рядок

## Крок 2: Перевірка встановлення Git

Відкрийте термінал (PowerShell або Command Prompt) і виконайте:

```bash
git --version
```

Якщо Git встановлено, ви побачите версію Git.

## Крок 3: Налаштування Git (перший раз)

Якщо ви вперше використовуєте Git на цьому комп'ютері:

```bash
git config --global user.name "Ваше Ім'я"
git config --global user.email "your.email@example.com"
```

## Крок 4: Ініціалізація Git репозиторію

Перейдіть у папку проекту та ініціалізуйте Git:

```bash
cd D:\work\estedilux_med
git init
```

## Крок 5: Додавання файлів до Git

Додайте всі файли проекту:

```bash
git add .
```

## Крок 6: Перший коміт

Створіть перший коміт:

```bash
git commit -m "Initial commit: Estedilux Med project setup"
```

## Крок 7: Підключення до віддаленого репозиторію (GitHub/GitLab/Bitbucket)

### Варіант A: Створити новий репозиторій на GitHub

1. Перейдіть на https://github.com
2. Створіть новий репозиторій (New Repository)
3. НЕ додавайте README, .gitignore або license (вони вже є в проекті)
4. Скопіюйте URL репозиторію (наприклад: `https://github.com/username/estedilux-med.git`)

### Варіант B: Використати існуючий репозиторій

Якщо у вас вже є репозиторій, скопіюйте його URL.

### Додавання віддаленого репозиторію:

```bash
git remote add origin https://github.com/username/estedilux-med.git
```

Замініть `username` та `estedilux-med` на ваші значення.

## Крок 8: Відправка коду на GitHub

```bash
git branch -M main
git push -u origin main
```

Якщо використовуєте іншу назву гілки (наприклад, `master`), замініть `main` на відповідну назву.

## Корисні команди Git

### Перевірити статус:
```bash
git status
```

### Подивитися історію комітів:
```bash
git log
```

### Додати зміни та зробити коміт:
```bash
git add .
git commit -m "Опис змін"
git push
```

### Створити нову гілку:
```bash
git checkout -b feature/назва-фічі
```

### Перемкнутися на гілку:
```bash
git checkout main
```

## Важливо!

Файл `.gitignore` вже налаштований і виключає:
- `node_modules/` - залежності (не потрібно комітити)
- `.next/` - збірка Next.js
- `.env` - змінні середовища (небезпечно комітити!)
- Інші тимчасові файли

## Якщо виникли проблеми

### Помилка "fatal: not a git repository"
Виконайте `git init` в папці проекту.

### Помилка при push "failed to push some refs"
Можливо, на віддаленому репозиторії вже є файли. Виконайте:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Забули додати файл до .gitignore
Якщо випадково додали файл, який не потрібно комітити:
```bash
git rm --cached файл-який-не-потрібен
git commit -m "Remove file from tracking"
```

