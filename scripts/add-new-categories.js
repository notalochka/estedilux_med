/**
 * Додає (або оновлює) категорії:
 * - Кадавер курс с анатомией
 * - Стажировка в Дубае
 * - Бизнес тур в Шанхай
 * - Бизнес тур в Южную Корею
 *
 * Запуск:
 *   npm run add-new-categories
 *   або: node scripts/add-new-categories.js
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database not found:', dbPath);
  process.exit(1);
}

const categories = [
  {
    title_ru: 'Кадавер курс с анатомией',
    title_en: 'Cadaver Course with Anatomy',
    title_tr: 'Anatomili Kadavra Kursu',
    title_uk: 'Кадавер курс з анатомією',
    description_ru:
      'Практические кадавер-курсы с углубленным изучением анатомии. Участники работают на биологических материалах под руководством опытных специалистов, осваивая безопасные техники и современные хирургические подходы.',
    description_en:
      'Practical cadaver courses with in-depth anatomy study. Participants work on biological materials under the guidance of experienced specialists, mastering safe techniques and modern surgical approaches.',
    description_tr:
      'Derinlemesine anatomi çalışması içeren pratik kadavra kursları. Katılımcılar deneyimli uzmanların rehberliğinde biyolojik materyaller üzerinde çalışarak güvenli teknikleri ve modern cerrahi yaklaşımları öğrenir.',
    description_uk:
      'Практичні кадавер-курси з поглибленим вивченням анатомії. Учасники працюють на біологічних матеріалах під керівництвом досвідчених спеціалістів, опановуючи безпечні техніки та сучасні хірургічні підходи.',
    subcategories: [
      { ru: 'Анатомия лица и шеи', en: 'Face and Neck Anatomy' },
      { ru: 'Хирургические техники на кадаверах', en: 'Surgical Techniques on Cadavers' },
      { ru: 'Безопасные инъекционные протоколы', en: 'Safe Injection Protocols' },
    ],
    icon: '/categories/Cadaver.jpg',
  },
  {
    title_ru: 'Стажировка в Дубае',
    title_en: 'Internship in Dubai',
    title_tr: 'Dubai Stajı',
    title_uk: 'Стажування в Дубаї',
    description_ru:
      'Программы стажировок в ведущих клиниках Дубая. Врачи получают практический опыт в международной среде, знакомятся с стандартами ОАЭ и расширяют профессиональную сеть контактов.',
    description_en:
      'Internship programs in leading Dubai clinics. Doctors gain practical experience in an international environment, learn UAE standards and expand their professional network.',
    description_tr:
      "Dubai'nin önde gelen kliniklerinde staj programları. Doktorlar uluslararası ortamda pratik deneyim kazanır, BAE standartlarını öğrenir ve profesyonel ağlarını genişletir.",
    description_uk:
      'Програми стажувань у провідних клініках Дубая. Лікарі отримують практичний досвід у міжнародному середовищі, знайомляться зі стандартами ОАЕ та розширюють професійну мережу контактів.',
    subcategories: [
      { ru: 'Клинические стажировки', en: 'Clinical Internships' },
      { ru: 'Наблюдение за операциями', en: 'Surgical Observation' },
      { ru: 'Лицензирование и релокация', en: 'Licensing and Relocation' },
    ],
    icon: '/categories/Special_programs.jpg',
  },
  {
    title_ru: 'Бизнес тур в Шанхай',
    title_en: 'Business Tour to Shanghai',
    title_tr: 'Şanghay İş Turu',
    title_uk: 'Бізнес-тур до Шанхаю',
    description_ru:
      'Бизнес-туры в Шанхай для врачей и владельцев клиник. Знакомство с медицинским рынком Китая, визиты в клиники и образовательные центры, обмен опытом и поиск партнеров.',
    description_en:
      "Business tours to Shanghai for doctors and clinic owners. Exploring China's medical market, visiting clinics and educational centers, exchanging experience and finding partners.",
    description_tr:
      'Doktorlar ve klinik sahipleri için Şanghay iş turları. Çin sağlık pazarını keşfetme, klinik ve eğitim merkezlerini ziyaret etme, deneyim paylaşımı ve ortak bulma.',
    description_uk:
      'Бізнес-тури до Шанхаю для лікарів і власників клінік. Знайомство з медичним ринком Китаю, візити до клінік і освітніх центрів, обмін досвідом і пошук партнерів.',
    subcategories: [
      { ru: 'Визиты в клиники', en: 'Clinic Visits' },
      { ru: 'Нетворкинг и партнерства', en: 'Networking and Partnerships' },
      { ru: 'Медицинский бизнес в Китае', en: 'Medical Business in China' },
    ],
    icon: '/categories/category_fallback_1.jpg',
  },
  {
    title_ru: 'Бизнес тур в Южную Корею',
    title_en: 'Business Tour to South Korea',
    title_tr: 'Güney Kore İş Turu',
    title_uk: 'Бізнес-тур до Південної Кореї',
    description_ru:
      'Бизнес-туры в Южную Корею: знакомство с передовыми эстетическими и медицинскими технологиями, визиты в клиники Сеула и обмен опытом с корейскими специалистами.',
    description_en:
      'Business tours to South Korea: exploring advanced aesthetic and medical technologies, visiting clinics in Seoul and exchanging experience with Korean specialists.',
    description_tr:
      'Güney Kore iş turları: ileri estetik ve tıbbi teknolojileri keşfetme, Seul kliniklerini ziyaret etme ve Koreli uzmanlarla deneyim paylaşımı.',
    description_uk:
      'Бізнес-тури до Південної Кореї: знайомство з передовими естетичними та медичними технологіями, візити до клінік Сеула та обмін досвідом з корейськими спеціалістами.',
    subcategories: [
      { ru: 'Эстетическая медицина Кореи', en: 'Korean Aesthetic Medicine' },
      { ru: 'Визиты в клиники Сеула', en: 'Seoul Clinic Visits' },
      { ru: 'Технологии и оборудование', en: 'Technologies and Equipment' },
    ],
    icon: '/categories/category_fallback_2.jpg',
  },
];

function sqlEscape(value) {
  if (value == null) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function runSql(sql, { ignoreErrors = false } = {}) {
  try {
    return execFileSync('sqlite3', [dbPath, sql], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', ignoreErrors ? 'pipe' : 'pipe'],
    }).trim();
  } catch (err) {
    if (ignoreErrors) return '';
    throw err;
  }
}

// Ensure optional columns exist
for (const col of ['title_tr', 'title_uk', 'description_tr', 'description_uk']) {
  runSql(`ALTER TABLE event_categories ADD COLUMN ${col} TEXT;`, { ignoreErrors: true });
}

let created = 0;
let updated = 0;

for (const cat of categories) {
  const existingId = runSql(
    `SELECT id FROM event_categories WHERE title_ru = ${sqlEscape(cat.title_ru)} COLLATE NOCASE LIMIT 1;`
  );
  const subcategories = sqlEscape(JSON.stringify(cat.subcategories));

  if (existingId) {
    runSql(`
      UPDATE event_categories SET
        title_en = ${sqlEscape(cat.title_en)},
        title_tr = ${sqlEscape(cat.title_tr)},
        title_uk = ${sqlEscape(cat.title_uk)},
        description_ru = ${sqlEscape(cat.description_ru)},
        description_en = ${sqlEscape(cat.description_en)},
        description_tr = ${sqlEscape(cat.description_tr)},
        description_uk = ${sqlEscape(cat.description_uk)},
        subcategories = ${subcategories},
        icon = ${sqlEscape(cat.icon)},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${existingId};
    `);
    updated += 1;
    console.log(`↻ Оновлено: ${cat.title_ru} (id=${existingId})`);
  } else {
    runSql(`
      INSERT INTO event_categories (
        title_ru, title_en, title_tr, title_uk,
        description_ru, description_en, description_tr, description_uk,
        subcategories, icon
      ) VALUES (
        ${sqlEscape(cat.title_ru)},
        ${sqlEscape(cat.title_en)},
        ${sqlEscape(cat.title_tr)},
        ${sqlEscape(cat.title_uk)},
        ${sqlEscape(cat.description_ru)},
        ${sqlEscape(cat.description_en)},
        ${sqlEscape(cat.description_tr)},
        ${sqlEscape(cat.description_uk)},
        ${subcategories},
        ${sqlEscape(cat.icon)}
      );
    `);
    const newId = runSql(`SELECT id FROM event_categories WHERE title_ru = ${sqlEscape(cat.title_ru)} LIMIT 1;`);
    created += 1;
    console.log(`✓ Додано: ${cat.title_ru} (id=${newId})`);
  }
}

console.log('\nГотово.');
console.log(`Додано: ${created}, оновлено: ${updated}`);
console.log('\nКатегорії в БД:');
const list = runSql(`
  SELECT id || '. ' || title_ru FROM event_categories
  WHERE title_ru IN (
    'Кадавер курс с анатомией',
    'Стажировка в Дубае',
    'Бизнес тур в Шанхай',
    'Бизнес тур в Южную Корею'
  )
  ORDER BY id;
`);
console.log(list || '(порожньо)');
