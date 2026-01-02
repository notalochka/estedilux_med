// Реєструємо ts-node для підтримки TypeScript
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('../tsconfig.json');

// Реєструємо path mapping
const baseUrl = tsConfig.compilerOptions.baseUrl || '.';
const paths = tsConfig.compilerOptions.paths || {};
tsConfigPaths.register({
  baseUrl,
  paths,
});

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    target: 'ES2020',
    lib: ['ES2020'],
    module: 'commonjs',
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: false,
    baseUrl: '.',
    paths: tsConfig.compilerOptions.paths,
  },
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

const getBlogById = db.prepare('SELECT * FROM blogs WHERE id = ?');
const updateBlog = db.prepare(`
  UPDATE blogs 
  SET image = ?, date = ?, title_ru = ?, title_en = ?, content_ru = ?, content_en = ?, published = ?
  WHERE id = ?
`);
const createBlog = db.prepare(`
  INSERT INTO blogs (id, image, date, title_ru, title_en, content_ru, content_en, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
          post.content.ru,
          post.content.en,
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
          post.content.ru,
          post.content.en,
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
