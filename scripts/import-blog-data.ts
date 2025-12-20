import { blogPosts } from '../src/data/blog';
import { createBlog, getBlogById } from '../src/lib/db';

async function importBlogData() {
  console.log('🚀 Starting blog data import...\n');
  
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const post of blogPosts) {
    try {
      // Перевіряємо, чи стаття вже існує
      const existing = getBlogById.get(post.id) as any;
      
      if (existing) {
        console.log(`⏭️  Skipped (already exists): ${post.title.ru}`);
        skipped++;
        continue;
      }
      
      // Імпортуємо статтю
      createBlog.run(
        post.image,
        post.date,
        post.title.ru,
        post.title.en,
        post.content.ru,
        post.content.en
      );
      
      console.log(`✓ Imported: ${post.title.ru}`);
      imported++;
    } catch (error: any) {
      console.error(`✗ Failed to import: ${post.title.ru}`, error.message);
      errors++;
    }
  }
  
  console.log(`\n✅ Import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

// Запускаємо імпорт
importBlogData()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });

