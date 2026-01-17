import { Event } from '@/types/events';

// Мапінг категорій за назвами
const categoryMap: Record<string, number> = {
  'Косметология': 1, // Эстетическая медицина и дерматология
  'Пластическая хирургия': 5, // Пластическая и реконструктивная хирургия
  'Гинекология': 3, // Гинекология и репродуктология
  'Стоматология': 4, // Стоматология и челюстно-лицевая хирургия
  'Анатомия': 2, // Анатомия и Cadaver программы
};

export const events2026: Event[] = [
  // Февраль - Стамбул
  {
    id: 100,
    categoryId: 1, // Косметология
    title: {
      ru: 'Косметологический Кадавер курс',
      en: 'Cosmetology Cadaver Course',
      tr: 'Kozmetoloji Kadavra Kursu',
      uk: 'Косметологічний Кадавер курс',
    },
    description: {
      ru: 'Практический курс по косметологии с использованием кадаверов. Изучение анатомии лица и безопасных техник инъекций.',
      en: 'Practical cosmetology course using cadavers. Study of facial anatomy and safe injection techniques.',
      tr: 'Kadavralar kullanılarak pratik kozmetoloji kursu. Yüz anatomisi ve güvenli enjeksiyon tekniklerinin incelenmesi.',
      uk: 'Практичний курс з косметології з використанням кадаверів. Вивчення анатомії обличчя та безпечних технік ін\'єкцій.',
    },
    date: '2026-02-03',
    endDate: '2026-02-04',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  {
    id: 101,
    categoryId: 5, // Пластическая хирургия
    title: {
      ru: 'Кадавер курс для пластических хирургов (Ринопластика)',
      en: 'Cadaver Course for Plastic Surgeons (Rhinoplasty)',
      tr: 'Plastik Cerrahlar için Kadavra Kursu (Rinoplasti)',
      uk: 'Кадавер курс для пластичних хірургів (Ринопластика)',
    },
    description: {
      ru: 'Специализированный курс по ринопластике с использованием кадаверов. Изучение техник ринопластики и анатомии носа.',
      en: 'Specialized rhinoplasty course using cadavers. Study of rhinoplasty techniques and nasal anatomy.',
      tr: 'Kadavralar kullanılarak uzmanlaşmış rinoplasti kursu. Rinoplasti teknikleri ve burun anatomisinin incelenmesi.',
      uk: 'Спеціалізований курс з ринопластики з використанням кадаверів. Вивчення технік ринопластики та анатомії носа.',
    },
    date: '2026-02-05',
    endDate: '2026-02-06',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  // Март - Дубай
  {
    id: 102,
    categoryId: 3, // Гинекология
    title: {
      ru: 'Стажировка для гинекологов в Дубае',
      en: 'Internship for Gynecologists in Dubai',
      tr: 'Dubai\'de Jinekologlar için Staj',
      uk: 'Стажування для гінекологів в Дубаї',
    },
    description: {
      ru: 'Практическая стажировка для гинекологов в ведущих клиниках Дубая. Ознакомление с современными методами диагностики и лечения.',
      en: 'Practical internship for gynecologists in leading Dubai clinics. Introduction to modern diagnostic and treatment methods.',
      tr: 'Dubai\'nin önde gelen kliniklerinde jinekologlar için pratik staj. Modern tanı ve tedavi yöntemlerine tanıtım.',
      uk: 'Практичне стажування для гінекологів у провідних клініках Дубаю. Ознайомлення з сучасними методами діагностики та лікування.',
    },
    date: '2026-03-02',
    endDate: '2026-03-03',
    location: {
      ru: 'Дубай, ОАЭ',
      en: 'Dubai, UAE',
      tr: 'Dubai, BAE',
      uk: 'Дубай, ОАЕ',
    },
    published: true,
  },
  {
    id: 103,
    categoryId: 1, // Косметология
    title: {
      ru: 'Стажировка для косметологов в Дубае',
      en: 'Internship for Cosmetologists in Dubai',
      tr: 'Dubai\'de Kozmetologlar için Staj',
      uk: 'Стажування для косметологів в Дубаї',
    },
    description: {
      ru: 'Практическая стажировка для косметологов в современных клиниках эстетической медицины Дубая.',
      en: 'Practical internship for cosmetologists in modern aesthetic medicine clinics in Dubai.',
      tr: 'Dubai\'deki modern estetik tıp kliniklerinde kozmetologlar için pratik staj.',
      uk: 'Практичне стажування для косметологів у сучасних клініках естетичної медицини Дубаю.',
    },
    date: '2026-03-04',
    endDate: '2026-03-05',
    location: {
      ru: 'Дубай, ОАЭ',
      en: 'Dubai, UAE',
      tr: 'Dubai, BAE',
      uk: 'Дубай, ОАЕ',
    },
    published: true,
  },
  // Март - Стамбул
  {
    id: 104,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Имплантология от А до Я',
      en: 'Implantology from A to Z',
      tr: 'A\'dan Z\'ye İmplantoloji',
      uk: 'Імплантологія від А до Я',
    },
    description: {
      ru: 'Комплексный курс по имплантологии. От основ до продвинутых техник. Практические занятия и теоретическая подготовка.',
      en: 'Comprehensive implantology course. From basics to advanced techniques. Practical sessions and theoretical training.',
      tr: 'Kapsamlı implantoloji kursu. Temellerden ileri tekniklere. Pratik oturumlar ve teorik eğitim.',
      uk: 'Комплексний курс з імплантології. Від основ до просунутих технік. Практичні заняття та теоретична підготовка.',
    },
    date: '2026-03-21',
    endDate: '2026-03-22',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  {
    id: 105,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии',
      en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery',
      tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu',
      uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії',
    },
    description: {
      ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.',
      en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.',
      tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.',
      uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.',
    },
    date: '2026-03-23',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  // Март - Батуми
  {
    id: 106,
    categoryId: 5, // Пластическая хирургия
    title: {
      ru: 'Кадавер курс для пластических хирургов (Подтяжка лица)',
      en: 'Cadaver Course for Plastic Surgeons (Face Lift)',
      tr: 'Plastik Cerrahlar için Kadavra Kursu (Yüz Germe)',
      uk: 'Кадавер курс для пластичних хірургів (Підтяжка обличчя)',
    },
    description: {
      ru: 'Специализированный курс по подтяжке лица с использованием кадаверов. Изучение современных техник и анатомии.',
      en: 'Specialized face lift course using cadavers. Study of modern techniques and anatomy.',
      tr: 'Kadavralar kullanılarak uzmanlaşmış yüz germe kursu. Modern teknikler ve anatomiyi inceleme.',
      uk: 'Спеціалізований курс з підтяжки обличчя з використанням кадаверів. Вивчення сучасних технік та анатомії.',
    },
    date: '2026-03-25',
    endDate: '2026-03-26',
    location: {
      ru: 'Батуми, Грузия',
      en: 'Batumi, Georgia',
      tr: 'Batumi, Gürcistan',
      uk: 'Батумі, Грузія',
    },
    published: true,
  },
  // Апрель - Батуми
  {
    id: 107,
    categoryId: 1, // Косметология
    title: {
      ru: 'Косметологический Кадавер курс',
      en: 'Cosmetology Cadaver Course',
      tr: 'Kozmetoloji Kadavra Kursu',
      uk: 'Косметологічний Кадавер курс',
    },
    description: {
      ru: 'Практический курс по косметологии с использованием кадаверов. Изучение анатомии лица и безопасных техник инъекций.',
      en: 'Practical cosmetology course using cadavers. Study of facial anatomy and safe injection techniques.',
      tr: 'Kadavralar kullanılarak pratik kozmetoloji kursu. Yüz anatomisi ve güvenli enjeksiyon tekniklerinin incelenmesi.',
      uk: 'Практичний курс з косметології з використанням кадаверів. Вивчення анатомії обличчя та безпечних технік ін\'єкцій.',
    },
    date: '2026-04-18',
    endDate: '2026-04-19',
    location: {
      ru: 'Батуми, Грузия',
      en: 'Batumi, Georgia',
      tr: 'Batumi, Gürcistan',
      uk: 'Батумі, Грузія',
    },
    published: true,
  },
  {
    id: 108,
    categoryId: 5, // Пластическая хирургия
    title: {
      ru: 'Кадавер для пластических хирургов (Блефаропластика)',
      en: 'Cadaver Course for Plastic Surgeons (Blepharoplasty)',
      tr: 'Plastik Cerrahlar için Kadavra Kursu (Blefaroplasti)',
      uk: 'Кадавер для пластичних хірургів (Блефаропластика)',
    },
    description: {
      ru: 'Специализированный курс по блефаропластике с использованием кадаверов. Изучение техник коррекции век.',
      en: 'Specialized blepharoplasty course using cadavers. Study of eyelid correction techniques.',
      tr: 'Kadavralar kullanılarak uzmanlaşmış blefaroplasti kursu. Göz kapağı düzeltme tekniklerinin incelenmesi.',
      uk: 'Спеціалізований курс з блефаропластики з використанням кадаверів. Вивчення технік корекції повік.',
    },
    date: '2026-04-20',
    endDate: '2026-04-21',
    location: {
      ru: 'Батуми, Грузия',
      en: 'Batumi, Georgia',
      tr: 'Batumi, Gürcistan',
      uk: 'Батумі, Грузія',
    },
    published: true,
  },
  // Апрель - Стамбул
  {
    id: 109,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Синус-лифтинг и немедленная имплантация',
      en: 'Sinus Lift and Immediate Implantation',
      tr: 'Sinüs Kaldırma ve Anında İmplantasyon',
      uk: 'Сінус-ліфтинг та негайна імплантація',
    },
    description: {
      ru: 'Специализированный курс по синус-лифтингу и техникам немедленной имплантации.',
      en: 'Specialized course on sinus lift and immediate implantation techniques.',
      tr: 'Sinüs kaldırma ve anında implantasyon teknikleri üzerine uzmanlaşmış kurs.',
      uk: 'Спеціалізований курс з сінус-ліфтингу та технік негайної імплантації.',
    },
    date: '2026-04-05',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  {
    id: 110,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии',
      en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery',
      tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu',
      uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії',
    },
    description: {
      ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.',
      en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.',
      tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.',
      uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.',
    },
    date: '2026-04-06',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  {
    id: 111,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Керамические виниры',
      en: 'Ceramic Veneers',
      tr: 'Seramik Veneerler',
      uk: 'Керамічні вініри',
    },
    description: {
      ru: 'Специализированный курс по изготовлению и установке керамических виниров.',
      en: 'Specialized course on manufacturing and installation of ceramic veneers.',
      tr: 'Seramik veneerlerin üretimi ve kurulumu üzerine uzmanlaşmış kurs.',
      uk: 'Спеціалізований курс з виготовлення та встановлення керамічних вінірів.',
    },
    date: '2026-04-29',
    endDate: '2026-04-30',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  // Май - Стамбул
  {
    id: 112,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Имплантология продвинутого уровня и челюстно-лицевая хирургия',
      en: 'Advanced Implantology and Maxillofacial Surgery',
      tr: 'İleri Düzey İmplantoloji ve Maksillofasiyal Cerrahi',
      uk: 'Імплантологія просунутого рівня та щелепно-лицьова хірургія',
    },
    description: {
      ru: 'Продвинутый курс по имплантологии и челюстно-лицевой хирургии. Для опытных специалистов.',
      en: 'Advanced course on implantology and maxillofacial surgery. For experienced specialists.',
      tr: 'İmplantoloji ve maksillofasiyal cerrahi üzerine ileri düzey kurs. Deneyimli uzmanlar için.',
      uk: 'Просунутий курс з імплантології та щелепно-лицьової хірургії. Для досвідчених спеціалістів.',
    },
    date: '2026-05-09',
    endDate: '2026-05-10',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  {
    id: 113,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Курс инъекционные аспекты в стоматологии и челюстно-лицевой хирургии',
      en: 'Course: Injectable Aspects in Dentistry and Maxillofacial Surgery',
      tr: 'Diş Hekimliği ve Maksillofasiyal Cerrahide Enjeksiyonel Yönler Kursu',
      uk: 'Курс ін\'єкційні аспекти в стоматології та щелепно-лицьовій хірургії',
    },
    description: {
      ru: 'Специализированный курс по инъекционным методикам в стоматологии и челюстно-лицевой хирургии.',
      en: 'Specialized course on injection techniques in dentistry and maxillofacial surgery.',
      tr: 'Diş hekimliği ve maksillofasiyal cerrahide enjeksiyon teknikleri üzerine uzmanlaşmış kurs.',
      uk: 'Спеціалізований курс з ін\'єкційних методик у стоматології та щелепно-лицьовій хірургії.',
    },
    date: '2026-05-12',
    location: {
      ru: 'Стамбул, Турция',
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      uk: 'Стамбул, Туреччина',
    },
    published: true,
  },
  // Май - Дубай
  {
    id: 114,
    categoryId: 4, // Стоматология
    title: {
      ru: 'Стажировка для стоматологов',
      en: 'Internship for Dentists',
      tr: 'Diş Hekimleri için Staj',
      uk: 'Стажування для стоматологів',
    },
    description: {
      ru: 'Практическая стажировка для стоматологов в ведущих клиниках Дубая.',
      en: 'Practical internship for dentists in leading Dubai clinics.',
      tr: 'Dubai\'nin önde gelen kliniklerinde diş hekimleri için pratik staj.',
      uk: 'Практичне стажування для стоматологів у провідних клініках Дубаю.',
    },
    date: '2026-05-23',
    endDate: '2026-05-24',
    location: {
      ru: 'Дубай, ОАЭ',
      en: 'Dubai, UAE',
      tr: 'Dubai, BAE',
      uk: 'Дубай, ОАЕ',
    },
    published: true,
  },
];
