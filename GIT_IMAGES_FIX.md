# Виправлення проблеми з фото в git

## Проблема
Фото перейменовані локально, але на сервері все ще використовуються старі назви.

## Можливі причини:
1. **Файли не закомічені** - нові перейменовані файли не додані до git
2. **Файли не запушені** - зміни закомічені локально, але не відправлені на сервер
3. **Кеш на сервері** - сервер використовує закешовані старі файли

## Рішення:

### Крок 1: Перевірте поточний стан
```bash
# Перевірте, які файли змінені
git status public/

# Перевірте, які файли в git
git ls-files public/ | grep -E "(about_team|about_service|category_fallback)"
```

### Крок 2: Додайте нові файли до git (якщо потрібно)
```bash
# Виконайте скрипт
./scripts/add-images-to-git.sh

# Або вручну:
git add public/about_team_*.jpg
git add public/about_partner_*.jpg
git add public/about_service_*.jpg
git add public/about/service_*.jpg
git add public/categories/category_fallback_*.jpg
```

### Крок 3: Закомітьте зміни
```bash
git commit -m "Rename image files with descriptive names and update code references"
```

### Крок 4: Запуште на сервер
```bash
git push origin main
```

### Крок 5: Перевірте на сервері
Після push перевірте:
- Чи оновилися файли на сервері
- Чи працюють нові посилання в коді
- Очистіть кеш на сервері (якщо використовується CDN або кеш)

## Якщо файли вже в git, але не працюють на сервері:

1. **Перевірте, чи файли дійсно запушені:**
```bash
git log --oneline --all -- public/about_team_main.jpg
```

2. **Перевірте на сервері:**
   - Зайдіть на сервер
   - Перевірте, чи існують файли: `ls public/about_team_*.jpg`
   - Перевірте git статус на сервері

3. **Очистіть кеш:**
   - Якщо використовується Next.js - перезапустіть сервер
   - Якщо використовується CDN - очистіть кеш CDN
   - Перевірте `.next` кеш: `rm -rf .next`

## Додаткова інформація:

Всі перейменовані файли:
- `about_team_main.jpg` (було `photo1.jpg`)
- `about_team_2.jpg` (було `photo2.jpg`)
- `about_team_3.jpg` (було `photo3.jpg`)
- `about_team_4.jpg` (було `photo4.jpg`)
- `about_team_5.jpg` (було `photo5.jpg`)
- `about_partner_1.jpg` (було `IMAGE 2026-01-11 22:22:16.jpg`)
- `about_partner_2.jpg` (було `IMAGE 2026-01-11 22:22:58.jpg`)
- `about_partner_3.jpg` (було `IMAGE 2026-01-11 22:23:10.jpg`)
- `about_partner_4.jpg` (було `IMAGE 2026-01-11 22:23:20.jpg`)
- `about_service_1.jpg` (було `IMAGE 2026-01-11 22:23:28.jpg`)
- `about_service_2.jpg` (було `IMAGE 2026-01-11 22:23:37.jpg`)
- `about/service_*.jpg` (було `about/photo*.jpg`)
- `categories/category_fallback_*.jpg` (було `categories/photo*.jpg`)
