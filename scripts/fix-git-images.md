# Інструкція для виправлення проблеми з фото в git

## Проблема
Фото перейменовані локально, але на сервері все ще використовуються старі назви.

## Рішення

### 1. Перевірте поточний стан:
```bash
git status public/
git ls-files public/ | grep -E "(photo|IMAGE|category_fallback|about_team|about_service|about_partner)"
```

### 2. Додайте нові перейменовані файли:
```bash
git add public/about_team_main.jpg
git add public/about_team_2.jpg
git add public/about_team_3.jpg
git add public/about_team_4.jpg
git add public/about_team_5.jpg
git add public/about_partner_1.jpg
git add public/about_partner_2.jpg
git add public/about_partner_3.jpg
git add public/about_partner_4.jpg
git add public/about_service_1.jpg
git add public/about_service_2.jpg
git add public/about/service_*.jpg
git add public/categories/category_fallback_*.jpg
```

### 3. Видаліть старі файли (якщо вони є в git):
```bash
# Перевірте, чи існують старі файли в git
git rm public/photo1.jpg 2>/dev/null || echo "File not in git"
git rm public/photo2.jpg 2>/dev/null || echo "File not in git"
git rm public/photo3.jpg 2>/dev/null || echo "File not in git"
git rm public/photo4.jpg 2>/dev/null || echo "File not in git"
git rm public/photo5.jpg 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:22:16.jpg" 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:22:58.jpg" 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:23:10.jpg" 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:23:20.jpg" 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:23:28.jpg" 2>/dev/null || echo "File not in git"
git rm "public/IMAGE 2026-01-11 22:23:37.jpg" 2>/dev/null || echo "File not in git"
git rm public/about/photo*.jpg 2>/dev/null || echo "Files not in git"
git rm public/categories/photo*.jpg 2>/dev/null || echo "Files not in git"
```

### 4. Закомітьте зміни:
```bash
git commit -m "Rename image files with descriptive names"
```

### 5. Запуште на сервер:
```bash
git push origin main
```

## Альтернативний варіант (якщо файли не в git)

Якщо старі файли не були в git, просто додайте нові:
```bash
git add public/about_*.jpg
git add public/about/service_*.jpg
git add public/categories/category_fallback_*.jpg
git commit -m "Add renamed image files"
git push origin main
```
