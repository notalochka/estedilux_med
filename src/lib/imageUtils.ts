/**
 * Отримує URL зображення через API endpoint для динамічного обслуговування
 * Це дозволяє завантажувати зображення, які були додані після білду проекту
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return '/photo1.jpg'; // fallback image
  }

  // Якщо це вже повний URL (http/https), повертаємо як є
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Якщо це статичний файл, який існує під час білду, використовуємо прямий шлях
  // Але для динамічно доданих файлів використовуємо API endpoint
  // Перевіряємо, чи це шлях до динамічного контенту (blog, events)
  if (imagePath.startsWith('/blog/') || imagePath.startsWith('/events/')) {
    // Видаляємо початковий слеш для API endpoint
    const apiPath = imagePath.substring(1);
    return `/api/images/${apiPath}`;
  }

  // Для інших статичних файлів повертаємо як є
  return imagePath;
}

