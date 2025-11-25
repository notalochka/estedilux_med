// Дані категорій подій
// Ця структура буде легко редагуватися адміністратором в майбутньому

import { EventCategory } from '@/types/events';

export const eventCategories: EventCategory[] = [
  {
    id: 'aesthetic-medicine',
    title: {
      ru: 'Эстетическая медицина и дерматология',
      en: 'Aesthetic Medicine and Dermatology',
    },
    description: {
      ru: 'Программы по эстетической медицине, дерматологии и современным косметологическим методикам',
      en: 'Programs in aesthetic medicine, dermatology and modern cosmetology techniques',
    },
    subcategories: [
      { ru: 'Инъекционная косметология', en: 'Injectable Cosmetology' },
      { ru: 'Full Face протоколы', en: 'Full Face Protocols' },
      { ru: 'Анатомия и безопасные техники', en: 'Anatomy and Safe Techniques' },
      { ru: 'Дерматология', en: 'Dermatology' },
      { ru: 'Аппаратные технологии', en: 'Hardware Technologies' },
      { ru: 'Трихология', en: 'Trichology' },
      { ru: 'Комбинированные методики', en: 'Combined Methods' },
      { ru: 'Работа с осложнениями', en: 'Complication Management' },
    ],
  },
  {
    id: 'anatomy-cadaver',
    title: {
      ru: 'Анатомия и Cadaver программы',
      en: 'Anatomy and Cadaver Programs',
    },
    description: {
      ru: 'Углубленное изучение анатомии через практические диссекционные программы',
      en: 'In-depth study of anatomy through practical dissection programs',
    },
    subcategories: [
      { ru: 'Анатомия лица', en: 'Facial Anatomy' },
      { ru: 'Инъекционная анатомия', en: 'Injectable Anatomy' },
      { ru: 'Хирургическая анатомия', en: 'Surgical Anatomy' },
      { ru: 'Cadaver курсы для врачей разных специальностей', en: 'Cadaver Courses for Doctors of Various Specialties' },
      { ru: 'Индивидуальные VIP-диссекции', en: 'Individual VIP Dissections' },
      { ru: 'Организация cadaver курсов под ключ', en: 'Turnkey Cadaver Course Organization' },
    ],
  },
  {
    id: 'gynecology',
    title: {
      ru: 'Гинекология и репродуктология',
      en: 'Gynecology and Reproductive Medicine',
    },
    description: {
      ru: 'Комплексные программы по гинекологии, акушерству и репродуктивной медицине',
      en: 'Comprehensive programs in gynecology, obstetrics and reproductive medicine',
    },
    subcategories: [
      { ru: 'Гинекология', en: 'Gynecology' },
      { ru: 'Гинекологическая хирургия', en: 'Gynecological Surgery' },
      { ru: 'Гинекологическая онкология', en: 'Gynecological Oncology' },
      { ru: 'Акушерство', en: 'Obstetrics' },
      { ru: 'Эндоскопическая гинекология', en: 'Endoscopic Gynecology' },
      { ru: 'Неонатология (NICU)', en: 'Neonatology (NICU)' },
      { ru: 'Репродуктология (IVF / ЭКО)', en: 'Reproductive Medicine (IVF)' },
      { ru: 'Репродуктивная эндокринология', en: 'Reproductive Endocrinology' },
    ],
  },
  {
    id: 'dentistry',
    title: {
      ru: 'Стоматология и челюстно-лицевая хирургия',
      en: 'Dentistry and Maxillofacial Surgery',
    },
    description: {
      ru: 'Современные стоматологические программы и челюстно-лицевая хирургия',
      en: 'Modern dental programs and maxillofacial surgery',
    },
    subcategories: [
      { ru: 'Хирургическая стоматология', en: 'Surgical Dentistry' },
      { ru: 'Имплантология', en: 'Implantology' },
      { ru: 'Ортопедия', en: 'Orthopedics' },
      { ru: 'Ортодонтия', en: 'Orthodontics' },
      { ru: 'Эстетическая стоматология', en: 'Aesthetic Dentistry' },
      { ru: 'Пародонтология', en: 'Periodontology' },
      { ru: 'Международные стоматологические стажировки', en: 'International Dental Internships' },
    ],
  },
  {
    id: 'plastic-surgery',
    title: {
      ru: 'Пластическая и реконструктивная хирургия',
      en: 'Plastic and Reconstructive Surgery',
    },
    description: {
      ru: 'Программы по пластической и реконструктивной хирургии',
      en: 'Programs in plastic and reconstructive surgery',
    },
    subcategories: [
      { ru: 'Пластика лица', en: 'Facial Plastic Surgery' },
      { ru: 'Отопластика', en: 'Otoplasty' },
      { ru: 'Блефаропластика', en: 'Blepharoplasty' },
      { ru: 'Ринопластика', en: 'Rhinoplasty' },
      { ru: 'Маммопластика', en: 'Mammoplasty' },
      { ru: 'Липосакция / липомоделирование', en: 'Liposuction / Lipomodelling' },
      { ru: 'Контурирование тела', en: 'Body Contouring' },
      { ru: 'Реконструктивные операции', en: 'Reconstructive Surgery' },
    ],
  },
  {
    id: 'general-surgery',
    title: {
      ru: 'Общая и малоинвазивная хирургия',
      en: 'General and Minimally Invasive Surgery',
    },
    description: {
      ru: 'Программы по общей и малоинвазивной хирургии',
      en: 'Programs in general and minimally invasive surgery',
    },
    subcategories: [
      { ru: 'Общая хирургия', en: 'General Surgery' },
      { ru: 'Лапароскопическая хирургия', en: 'Laparoscopic Surgery' },
      { ru: 'Эндоскопия ЖКТ', en: 'Gastrointestinal Endoscopy' },
      { ru: 'Минимально инвазивные техники', en: 'Minimally Invasive Techniques' },
      { ru: 'Трансплантология', en: 'Transplantology' },
    ],
  },
  {
    id: 'orthopedics',
    title: {
      ru: 'Ортопедия, травматология и спортивная медицина',
      en: 'Orthopedics, Traumatology and Sports Medicine',
    },
    description: {
      ru: 'Программы по ортопедии, травматологии и спортивной медицине',
      en: 'Programs in orthopedics, traumatology and sports medicine',
    },
    subcategories: [
      { ru: 'Ортопедическая хирургия', en: 'Orthopedic Surgery' },
      { ru: 'Травматология', en: 'Traumatology' },
      { ru: 'Вертебрология', en: 'Vertebrology' },
      { ru: 'Спортивная медицина', en: 'Sports Medicine' },
      { ru: 'Ортопедическая реабилитация', en: 'Orthopedic Rehabilitation' },
    ],
  },
  {
    id: 'neurology',
    title: {
      ru: 'Неврология и нейрохирургия',
      en: 'Neurology and Neurosurgery',
    },
    description: {
      ru: 'Программы по неврологии и нейрохирургии',
      en: 'Programs in neurology and neurosurgery',
    },
    subcategories: [
      { ru: 'Клиническая неврология', en: 'Clinical Neurology' },
      { ru: 'Нейрохирургия', en: 'Neurosurgery' },
      { ru: 'Нейроортопедия', en: 'Neuroorthopedics' },
      { ru: 'Нейрореабилитация', en: 'Neurorehabilitation' },
    ],
  },
  {
    id: 'cardiology',
    title: {
      ru: 'Кардиология и кардиохирургия',
      en: 'Cardiology and Cardiac Surgery',
    },
    description: {
      ru: 'Программы по кардиологии и кардиохирургии',
      en: 'Programs in cardiology and cardiac surgery',
    },
    subcategories: [
      { ru: 'Кардиология', en: 'Cardiology' },
      { ru: 'Интервенционная кардиология', en: 'Interventional Cardiology' },
      { ru: 'Детская кардиохирургия', en: 'Pediatric Cardiac Surgery' },
      { ru: 'Электрофизиология', en: 'Electrophysiology' },
      { ru: 'Имплантация кардиостимуляторов', en: 'Pacemaker Implantation' },
    ],
  },
  {
    id: 'therapeutics',
    title: {
      ru: 'Терапевтические направления',
      en: 'Therapeutic Specialties',
    },
    description: {
      ru: 'Программы по терапевтическим направлениям',
      en: 'Programs in therapeutic specialties',
    },
    subcategories: [
      { ru: 'Терапия', en: 'Internal Medicine' },
      { ru: 'Эндокринология', en: 'Endocrinology' },
      { ru: 'Нефрология', en: 'Nephrology' },
      { ru: 'Пульмонология', en: 'Pulmonology' },
      { ru: 'Гастроэнтерология', en: 'Gastroenterology' },
    ],
  },
  {
    id: 'radiology',
    title: {
      ru: 'Радиология и УЗ-диагностика',
      en: 'Radiology and Ultrasound Diagnostics',
    },
    description: {
      ru: 'Программы по радиологии и ультразвуковой диагностике',
      en: 'Programs in radiology and ultrasound diagnostics',
    },
    subcategories: [
      { ru: 'Диагностическая радиология', en: 'Diagnostic Radiology' },
      { ru: 'Интервенционная радиология', en: 'Interventional Radiology' },
      { ru: 'Экспертное УЗИ', en: 'Expert Ultrasound' },
      { ru: 'ЭхоКГ', en: 'Echocardiography' },
      { ru: 'УЗИ в акушерстве и гинекологии', en: 'Ultrasound in Obstetrics and Gynecology' },
    ],
  },
  {
    id: 'pediatrics',
    title: {
      ru: 'Педиатрия',
      en: 'Pediatrics',
    },
    description: {
      ru: 'Программы по педиатрии и детской медицине',
      en: 'Programs in pediatrics and child medicine',
    },
    subcategories: [
      { ru: 'Общая педиатрия', en: 'General Pediatrics' },
      { ru: 'Детская хирургия', en: 'Pediatric Surgery' },
      { ru: 'Детская кардиология', en: 'Pediatric Cardiology' },
      { ru: 'Неонатология', en: 'Neonatology' },
    ],
  },
  {
    id: 'urology',
    title: {
      ru: 'Урология',
      en: 'Urology',
    },
    description: {
      ru: 'Программы по урологии',
      en: 'Programs in urology',
    },
    subcategories: [
      { ru: 'Общая урология', en: 'General Urology' },
      { ru: 'Оперативная урология', en: 'Operative Urology' },
      { ru: 'Малоинвазивные процедуры', en: 'Minimally Invasive Procedures' },
    ],
  },
  {
    id: 'oncology',
    title: {
      ru: 'Онкология',
      en: 'Oncology',
    },
    description: {
      ru: 'Программы по онкологии',
      en: 'Programs in oncology',
    },
    subcategories: [
      { ru: 'Хирургическая онкология', en: 'Surgical Oncology' },
      { ru: 'Медицинская онкология', en: 'Medical Oncology' },
      { ru: 'Онкопластика', en: 'Oncoplastic Surgery' },
      { ru: 'Онкогинекология', en: 'Oncogynecology' },
    ],
  },
  {
    id: 'ophthalmology',
    title: {
      ru: 'Офтальмология',
      en: 'Ophthalmology',
    },
    description: {
      ru: 'Программы по офтальмологии',
      en: 'Programs in ophthalmology',
    },
    subcategories: [
      { ru: 'Диагностика', en: 'Diagnostics' },
      { ru: 'Лазерная офтальмология', en: 'Laser Ophthalmology' },
      { ru: 'Микрохирургия глаза', en: 'Eye Microsurgery' },
      { ru: 'Хирургическое лечение', en: 'Surgical Treatment' },
      { ru: 'Современные методы коррекции зрения', en: 'Modern Vision Correction Methods' },
    ],
  },
  {
    id: 'infectious-diseases',
    title: {
      ru: 'Инфекционные заболевания',
      en: 'Infectious Diseases',
    },
    description: {
      ru: 'Программы по инфекционным заболеваниям',
      en: 'Programs in infectious diseases',
    },
    subcategories: [
      { ru: 'Клиническая инфектология', en: 'Clinical Infectious Diseases' },
      { ru: 'Госпитальная эпидемиология и безопасность', en: 'Hospital Epidemiology and Safety' },
    ],
  },
  {
    id: 'laboratory-genetics',
    title: {
      ru: 'Лабораторная медицина и генетика',
      en: 'Laboratory Medicine and Genetics',
    },
    description: {
      ru: 'Программы по лабораторной медицине и генетике',
      en: 'Programs in laboratory medicine and genetics',
    },
    subcategories: [
      { ru: 'Клинические лаборатории', en: 'Clinical Laboratories' },
      { ru: 'ПЦР-диагностика', en: 'PCR Diagnostics' },
      { ru: 'Медицинская генетика', en: 'Medical Genetics' },
      { ru: 'Пренатальная диагностика', en: 'Prenatal Diagnostics' },
    ],
  },
  {
    id: 'psychiatry',
    title: {
      ru: 'Психиатрия и психотерапия',
      en: 'Psychiatry and Psychotherapy',
    },
    description: {
      ru: 'Программы по психиатрии и психотерапии',
      en: 'Programs in psychiatry and psychotherapy',
    },
    subcategories: [
      { ru: 'Клиническая психиатрия', en: 'Clinical Psychiatry' },
      { ru: 'Психотерапия', en: 'Psychotherapy' },
      { ru: 'Нейропсихология', en: 'Neuropsychology' },
    ],
  },
  {
    id: 'palliative',
    title: {
      ru: 'Паллиативная медицина',
      en: 'Palliative Medicine',
    },
    description: {
      ru: 'Программы по паллиативной медицине',
      en: 'Programs in palliative medicine',
    },
    subcategories: [
      { ru: 'Комплексная паллиативная помощь', en: 'Comprehensive Palliative Care' },
      { ru: 'Обезболивание и поддержка тяжелых пациентов', en: 'Pain Management and Support for Critically Ill Patients' },
    ],
  },
  {
    id: 'special-programs',
    title: {
      ru: 'Специальные программы Estedilux Med',
      en: 'Special Estedilux Med Programs',
    },
    description: {
      ru: 'Уникальные программы и услуги Estedilux Med',
      en: 'Unique programs and services of Estedilux Med',
    },
    subcategories: [
      { ru: 'Стажировки в клиниках', en: 'Clinical Internships' },
      { ru: 'Стажировки в университетах', en: 'University Internships' },
      { ru: 'Индивидуальные программы обучения 1:1', en: 'Individual 1:1 Training Programs' },
      { ru: 'Авторские курсы и методики', en: 'Custom Courses and Methodologies' },
      { ru: 'Медицинские мероприятия под ключ', en: 'Turnkey Medical Events' },
      { ru: 'Релокация врачей в Дубай', en: 'Doctor Relocation to Dubai' },
      { ru: 'Подготовка документов и лицензирование (DHA / DOH / MOH)', en: 'Document Preparation and Licensing (DHA / DOH / MOH)' },
    ],
  },
];
