// Спрощена версія без ts-node - використовує JSON файли
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Шлях до бази даних
const dbPath = path.join(process.cwd(), 'data', 'admin.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

// Ініціалізуємо БД
db.exec(`
  CREATE TABLE IF NOT EXISTS event_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    subcategories TEXT NOT NULL,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

try { db.exec('ALTER TABLE event_categories ADD COLUMN title_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN title_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN description_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE event_categories ADD COLUMN description_uk TEXT'); } catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ru TEXT,
    description_en TEXT,
    date TEXT,
    end_date TEXT,
    location_ru TEXT,
    location_en TEXT,
    price REAL,
    duration TEXT,
    image TEXT,
    published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES event_categories(id)
  )
`);

try { db.exec('ALTER TABLE events ADD COLUMN title_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN title_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN description_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN description_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN location_tr TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN location_uk TEXT'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN published INTEGER DEFAULT 1'); } catch (e) {}
try { db.exec('ALTER TABLE events ADD COLUMN end_date TEXT'); } catch (e) {}

const createEvent = db.prepare(`
  INSERT INTO events (id, category_id, title_ru, title_en, title_tr, title_uk, description_ru, description_en, description_tr, description_uk, date, end_date, location_ru, location_en, location_tr, location_uk, price, duration, image, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Події 2026 з розкладу
const events2026 = [
  {
    id: 100, categoryId: 1,
    title: { ru: 'Косметологический Кадавер курс', en: 'Cosmetology Cadaver Course', tr: 'Kozmetoloji Kadavra Kursu', uk: 'Косметологічний Кадавер курс' },
    description: { ru: 'Практический курс по косметологии с использованием кадаверов.', en: 'Practical cosmetology course using cadavers.', tr: 'Kadavralar kullanılarak pratik kozmetoloji kursu.', uk: 'Практичний курс з косметології з використанням кадаверів.' },
    date: '2026-02-03', endDate: '2026-02-04',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 101, categoryId: 5,
    title: { ru: 'Кадавер курс для пластических хирургов (Ринопластика)', en: 'Cadaver Course for Plastic Surgeons (Rhinoplasty)', tr: 'Plastik Cerrahlar için Kadavra Kursu (Rinoplasti)', uk: 'Кадавер курс для пластичних хірургів (Ринопластика)' },
    description: { ru: 'Специализированный курс по ринопластике с использованием кадаверов.', en: 'Specialized rhinoplasty course using cadavers.', tr: 'Kadavralar kullanılarak uzmanlaşmış rinoplasti kursu.', uk: 'Спеціалізований курс з ринопластики з використанням кадаверів.' },
    date: '2026-02-05', endDate: '2026-02-06',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 102, categoryId: 3,
    title: { ru: 'Стажировка для гинекологов в Дубае', en: 'Internship for Gynecologists in Dubai', tr: 'Dubai\'de Jinekologlar için Staj', uk: 'Стажування для гінекологів в Дубаї' },
    description: { ru: 'Практическая стажировка для гинекологов в ведущих клиниках Дубая.', en: 'Practical internship for gynecologists in leading Dubai clinics.', tr: 'Dubai\'nin önde gelen kliniklerinde jinekologlar için pratik staj.', uk: 'Практичне стажування для гінекологів у провідних клініках Дубаю.' },
    date: '2026-03-02', endDate: '2026-03-03',
    location: { ru: 'Дубай, ОАЭ', en: 'Dubai, UAE', tr: 'Dubai, BAE', uk: 'Дубай, ОАЕ' },
    published: true,
  },
  {
    id: 103, categoryId: 1,
    title: { ru: 'Стажировка для косметологов в Дубае', en: 'Internship for Cosmetologists in Dubai', tr: 'Dubai\'de Kozmetologlar için Staj', uk: 'Стажування для косметологів в Дубаї' },
    description: { ru: 'Практическая стажировка для косметологов в современных клиниках эстетической медицины Дубая.', en: 'Practical internship for cosmetologists in modern aesthetic medicine clinics in Dubai.', tr: 'Dubai\'deki modern estetik tıp kliniklerinde kozmetologlar için pratik staj.', uk: 'Практичне стажування для косметологів у сучасних клініках естетичної медицини Дубаю.' },
    date: '2026-03-04', endDate: '2026-03-05',
    location: { ru: 'Дубай, ОАЭ', en: 'Dubai, UAE', tr: 'Dubai, BAE', uk: 'Дубай, ОАЕ' },
    published: true,
  },
  {
    id: 104, categoryId: 4,
    title: { ru: 'Имплантология от А до Я', en: 'Implantology from A to Z', tr: 'A\'dan Z\'ye İmplantoloji', uk: 'Імплантологія від А до Я' },
    description: { ru: 'Комплексный курс по имплантологии. От основ до продвинутых техник.', en: 'Comprehensive implantology course. From basics to advanced techniques.', tr: 'Kapsamlı implantoloji kursu. Temellerden ileri tekniklere.', uk: 'Комплексний курс з імплантології. Від основ до просунутих технік.' },
    date: '2026-03-21', endDate: '2026-03-22',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 105, categoryId: 4,
    title: { ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии', en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery', tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu', uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії' },
    description: { ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.', en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.', tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.', uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.' },
    date: '2026-03-23',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 106, categoryId: 5,
    title: { ru: 'Кадавер курс для пластических хирургов (Подтяжка лица)', en: 'Cadaver Course for Plastic Surgeons (Face Lift)', tr: 'Plastik Cerrahlar için Kadavra Kursu (Yüz Germe)', uk: 'Кадавер курс для пластичних хірургів (Підтяжка обличчя)' },
    description: { ru: 'Специализированный курс по подтяжке лица с использованием кадаверов.', en: 'Specialized face lift course using cadavers.', tr: 'Kadavralar kullanılarak uzmanlaşmış yüz germe kursu.', uk: 'Спеціалізований курс з підтяжки обличчя з використанням кадаверів.' },
    date: '2026-03-25', endDate: '2026-03-26',
    location: { ru: 'Батуми, Грузия', en: 'Batumi, Georgia', tr: 'Batumi, Gürcistan', uk: 'Батумі, Грузія' },
    published: true,
  },
  {
    id: 107, categoryId: 1,
    title: { ru: 'Косметологический Кадавер курс', en: 'Cosmetology Cadaver Course', tr: 'Kozmetoloji Kadavra Kursu', uk: 'Косметологічний Кадавер курс' },
    description: { ru: 'Практический курс по косметологии с использованием кадаверов.', en: 'Practical cosmetology course using cadavers.', tr: 'Kadavralar kullanılarak pratik kozmetoloji kursu.', uk: 'Практичний курс з косметології з використанням кадаверів.' },
    date: '2026-04-18', endDate: '2026-04-19',
    location: { ru: 'Батуми, Грузия', en: 'Batumi, Georgia', tr: 'Batumi, Gürcistan', uk: 'Батумі, Грузія' },
    published: true,
  },
  {
    id: 108, categoryId: 5,
    title: { ru: 'Кадавер для пластических хирургов (Блефаропластика)', en: 'Cadaver Course for Plastic Surgeons (Blepharoplasty)', tr: 'Plastik Cerrahlar için Kadavra Kursu (Blefaroplasti)', uk: 'Кадавер для пластичних хірургів (Блефаропластика)' },
    description: { ru: 'Специализированный курс по блефаропластике с использованием кадаверов.', en: 'Specialized blepharoplasty course using cadavers.', tr: 'Kadavralar kullanılarak uzmanlaşmış blefaroplasti kursu.', uk: 'Спеціалізований курс з блефаропластики з використанням кадаверів.' },
    date: '2026-04-20', endDate: '2026-04-21',
    location: { ru: 'Батуми, Грузия', en: 'Batumi, Georgia', tr: 'Batumi, Gürcistan', uk: 'Батумі, Грузія' },
    published: true,
  },
  {
    id: 109, categoryId: 4,
    title: { ru: 'Синус-лифтинг и немедленная имплантация', en: 'Sinus Lift and Immediate Implantation', tr: 'Sinüs Kaldırma ve Anında İmplantasyon', uk: 'Сінус-ліфтинг та негайна імплантація' },
    description: { ru: 'Специализированный курс по синус-лифтингу и техникам немедленной имплантации.', en: 'Specialized course on sinus lift and immediate implantation techniques.', tr: 'Sinüs kaldırma ve anında implantasyon teknikleri üzerine uzmanlaşmış kurs.', uk: 'Спеціалізований курс з сінус-ліфтингу та технік негайної імплантації.' },
    date: '2026-04-05',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 110, categoryId: 4,
    title: { ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии', en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery', tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu', uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії' },
    description: { ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.', en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.', tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.', uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.' },
    date: '2026-04-06',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 111, categoryId: 4,
    title: { ru: 'Керамические виниры', en: 'Ceramic Veneers', tr: 'Seramik Veneerler', uk: 'Керамічні вініри' },
    description: { ru: 'Специализированный курс по изготовлению и установке керамических виниров.', en: 'Specialized course on manufacturing and installation of ceramic veneers.', tr: 'Seramik veneerlerin üretimi ve kurulumu üzerine uzmanlaşmış kurs.', uk: 'Спеціалізований курс з виготовлення та встановлення керамічних вінірів.' },
    date: '2026-04-29', endDate: '2026-04-30',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 112, categoryId: 4,
    title: { ru: 'Имплантология продвинутого уровня и челюстно-лицевая хирургия', en: 'Advanced Implantology and Maxillofacial Surgery', tr: 'İleri Düzey İmplantoloji ve Maksillofasiyal Cerrahi', uk: 'Імплантологія просунутого рівня та щелепно-лицьова хірургія' },
    description: { ru: 'Продвинутый курс по имплантологии и челюстно-лицевой хирургии. Для опытных специалистов.', en: 'Advanced course on implantology and maxillofacial surgery. For experienced specialists.', tr: 'İmplantoloji ve maksillofasiyal cerrahi üzerine ileri düzey kurs. Deneyimli uzmanlar için.', uk: 'Просунутий курс з імплантології та щелепно-лицьової хірургії. Для досвідчених спеціалістів.' },
    date: '2026-05-09', endDate: '2026-05-10',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 113, categoryId: 4,
    title: { ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии', en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery', tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu', uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії' },
    description: { ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.', en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.', tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.', uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.' },
    date: '2026-05-12',
    location: { ru: 'Стамбул, Турция', en: 'Istanbul, Turkey', tr: 'İstanbul, Türkiye', uk: 'Стамбул, Туреччина' },
    published: true,
  },
  {
    id: 114, categoryId: 4,
    title: { ru: 'Стажировка для стоматологов', en: 'Internship for Dentists', tr: 'Diş Hekimleri için Staj', uk: 'Стажування для стоматологів' },
    description: { ru: 'Практическая стажировка для стоматологов в ведущих клиниках Дубая.', en: 'Practical internship for dentists in leading Dubai clinics.', tr: 'Dubai\'nin önde gelen kliniklerinde diş hekimleri için pratik staj.', uk: 'Практичне стажування для стоматологів у провідних клініках Дубаю.' },
    date: '2026-05-23', endDate: '2026-05-24',
    location: { ru: 'Дубай, ОАЭ', en: 'Dubai, UAE', tr: 'Dubai, BAE', uk: 'Дубай, ОАЕ' },
    published: true,
  },
];

async function importEvents2026() {
  console.log('🚀 Starting events 2026 import...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const event of events2026) {
    try {
      const existingEvent = db.prepare('SELECT id FROM events WHERE id = ?').get(event.id);
      if (existingEvent) {
        console.log(`- Skipping existing event: ${event.title.ru}`);
        skipped++;
        continue;
      }
      
      createEvent.run(
        event.id,
        event.categoryId,
        event.title.ru,
        event.title.en,
        event.title.tr || null,
        event.title.uk || null,
        event.description?.ru || null,
        event.description?.en || null,
        event.description?.tr || null,
        event.description?.uk || null,
        event.date || null,
        event.endDate || null,
        event.location?.ru || null,
        event.location?.en || null,
        event.location?.tr || null,
        event.location?.uk || null,
        event.price || null,
        event.duration || null,
        event.image || null,
        event.published !== false ? 1 : 0
      );
      console.log(`✓ Imported event 2026: ${event.title.ru}`);
      imported++;
    } catch (error) {
      console.error(`✗ Failed to import event 2026: ${event.title.ru}`, error.message);
      errors++;
    }
  }
  
  console.log(`\n✅ Events 2026 import completed!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

importEvents2026()
  .then(() => {
    console.log('\n✨ Done!');
    db.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    db.close();
    process.exit(1);
  });
