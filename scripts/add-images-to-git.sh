#!/bin/bash

# Скрипт для додавання перейменованих фото до git

echo "🔄 Додавання нових фото до git..."

# Додаємо нові перейменовані файли
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

git add public/about/service_1.jpg
git add public/about/service_2.jpg
git add public/about/service_3.jpg
git add public/about/service_4.jpg
git add public/about/service_5.jpg
git add public/about/service_6.jpg
git add public/about/service_7.jpg

git add public/categories/category_fallback_1.jpg
git add public/categories/category_fallback_2.jpg
git add public/categories/category_fallback_3.jpg
git add public/categories/category_fallback_4.jpg

echo "✅ Файли додані до git"
echo ""
echo "📝 Перевірте статус:"
git status public/ --short

echo ""
echo "💡 Якщо все добре, виконайте:"
echo "   git commit -m 'Add renamed image files'"
echo "   git push origin main"
