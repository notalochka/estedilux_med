// Реєструємо ts-node для підтримки TypeScript
const tsNode = require('ts-node');

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    target: 'ES2020',
  },
  typeCheck: false,
  files: false,
  ignore: ['(?:^|/)node_modules/'],
});

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

// Імпортуємо дані з blog.ts
const { blogPosts } = require('../src/data/blog.ts');

// Додаємо колонки для турецької та української мов для блогів
try {
  db.exec('ALTER TABLE blogs ADD COLUMN title_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE blogs ADD COLUMN title_uk TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE blogs ADD COLUMN content_tr TEXT');
} catch (e) {}
try {
  db.exec('ALTER TABLE blogs ADD COLUMN content_uk TEXT');
} catch (e) {}

const getBlogById = db.prepare('SELECT * FROM blogs WHERE id = ?');
const updateBlog = db.prepare(`
  UPDATE blogs 
  SET image = ?, date = ?, title_ru = ?, title_en = ?, title_tr = ?, title_uk = ?, content_ru = ?, content_en = ?, content_tr = ?, content_uk = ?, published = ?
  WHERE id = ?
`);
const createBlog = db.prepare(`
  INSERT INTO blogs (id, image, date, title_ru, title_en, title_tr, title_uk, content_ru, content_en, content_tr, content_uk, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

async function importBlogData() {
  console.log('🚀 Starting blog data import...\n');
  
  let imported = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const post of blogPosts) {
    try {
      const existing = getBlogById.get(post.id);
      
      if (existing) {
        // Оновлюємо існуючий запис
        updateBlog.run(
          post.image,
          post.date,
          post.title.ru,
          post.title.en,
          post.title.tr || null,
          post.title.uk || null,
          post.content.ru,
          post.content.en,
          post.content.tr || null,
          post.content.uk || null,
          1,
          post.id
        );
        console.log(`✓ Updated: ${post.title.ru}`);
        updated++;
      } else {
        // Створюємо новий запис
        createBlog.run(
          post.id,
          post.image,
          post.date,
          post.title.ru,
          post.title.en,
          post.title.tr || null,
          post.title.uk || null,
          post.content.ru,
          post.content.en,
          post.content.tr || null,
          post.content.uk || null,
          1
        );
        console.log(`✓ Imported: ${post.title.ru}`);
        imported++;
      }
    } catch (error) {
      console.error(`✗ Failed to import: ${post.title.ru}`, error.message);
      errors++;
    }
  }
  
  console.log(`\n✅ Import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  
  db.close();
}

importBlogData()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
