import { EventCategory } from '@/types/events';

export const eventCategories: EventCategory[] = [
  {
    id: 1,
    title: {
      ru: 'Эстетическая медицина и дерматология',
      en: 'Aesthetic Medicine and Dermatology',
    },
    description: {
      ru: 'Estedilux Med предлагает комплексные программы по эстетической медицине, дерматологии и современным косметологическим методикам. Наши программы разработаны с учетом международных стандартов и обеспечивают врачам доступ к передовым техникам и практикам. Мы организуем практические курсы в ведущих медицинских центрах мира, где участники получают возможность изучить инъекционные методики, аппаратные технологии и современные протоколы лечения под руководством опытных специалистов. Все программы включают теоретическую подготовку и практические занятия, что позволяет врачам не только освоить новые техники, но и понять принципы безопасного применения различных методик в эстетической медицине.',
      en: 'Estedilux Med offers comprehensive programs in aesthetic medicine, dermatology and modern cosmetology techniques. Our programs are designed with international standards in mind and provide doctors with access to advanced techniques and practices. We organize practical courses in leading medical centers worldwide, where participants have the opportunity to study injection techniques, hardware technologies and modern treatment protocols under the guidance of experienced specialists. All programs include theoretical training and practical sessions, allowing doctors to not only master new techniques but also understand the principles of safe application of various methods in aesthetic medicine.',
    },
    subcategories: [
      {
        ru: 'Инъекционная косметология',
        en: 'Injectable Cosmetology',
        description: {
          ru: 'Практические программы по инъекционным методикам в эстетической медицине. Изучение техник работы с филлерами, ботулотоксином и другими препаратами под руководством опытных специалистов.',
          en: 'Practical programs on injection techniques in aesthetic medicine. Learning techniques for working with fillers, botulinum toxin and other preparations under the guidance of experienced specialists.',
        },
      },
      {
        ru: 'Full Face протоколы',
        en: 'Full Face Protocols',
        description: {
          ru: 'Комплексные программы по омоложению лица с использованием различных методик. Изучение протоколов комплексного подхода к эстетической коррекции.',
          en: 'Comprehensive programs for facial rejuvenation using various techniques. Learning protocols for a comprehensive approach to aesthetic correction.',
        },
      },
      {
        ru: 'Анатомия и безопасные техники',
        en: 'Anatomy and Safe Techniques',
        description: {
          ru: 'Углубленное изучение анатомии лица и шеи для безопасного проведения инъекционных процедур. Практические занятия на кадаверах и симуляторах.',
          en: 'In-depth study of facial and neck anatomy for safe injection procedures. Practical sessions on cadavers and simulators.',
        },
      },
      {
        ru: 'Дерматология',
        en: 'Dermatology',
        description: {
          ru: 'Программы по диагностике и лечению различных дерматологических заболеваний. Изучение современных методов терапии и аппаратных технологий.',
          en: 'Programs on diagnosis and treatment of various dermatological diseases. Learning modern therapy methods and hardware technologies.',
        },
      },
      {
        ru: 'Аппаратные технологии',
        en: 'Hardware Technologies',
        description: {
          ru: 'Обучение работе с современным оборудованием для эстетических процедур: лазеры, радиочастотные аппараты, ультразвуковые системы и другие технологии.',
          en: 'Training on working with modern equipment for aesthetic procedures: lasers, radiofrequency devices, ultrasound systems and other technologies.',
        },
      },
      {
        ru: 'Трихология',
        en: 'Trichology',
        description: {
          ru: 'Специализированные программы по диагностике и лечению заболеваний волос и кожи головы. Изучение современных протоколов терапии облысения.',
          en: 'Specialized programs on diagnosis and treatment of hair and scalp diseases. Learning modern protocols for alopecia therapy.',
        },
      },
      {
        ru: 'Комбинированные методики',
        en: 'Combined Methods',
        description: {
          ru: 'Программы по комбинированию различных эстетических методик для достижения оптимальных результатов. Интеграция инъекционных, аппаратных и хирургических техник.',
          en: 'Programs on combining various aesthetic methods to achieve optimal results. Integration of injection, hardware and surgical techniques.',
        },
      },
      {
        ru: 'Работа с осложнениями',
        en: 'Complication Management',
        description: {
          ru: 'Обучение диагностике, профилактике и лечению осложнений в эстетической медицине. Практические кейсы и алгоритмы действий при различных ситуациях.',
          en: 'Training on diagnosis, prevention and treatment of complications in aesthetic medicine. Practical cases and action algorithms for various situations.',
        },
      },
    ],
  },
  {
    id: 2,
    title: {
      ru: 'Анатомия и Cadaver программы',
      en: 'Anatomy and Cadaver Programs',
    },
    description: {
      ru: 'Программы по анатомии и cadaver курсам от Estedilux Med предоставляют уникальную возможность углубленного изучения анатомии человека через практические диссекционные программы. Мы организуем курсы в университетских анатомических лабораториях, оснащенных по мировым стандартам, где врачи могут изучать анатомию лица, шеи и других областей на реальных кадаверах. Наши программы включают изучение инъекционной анатомии, хирургической анатомии и практические диссекции под руководством опытных анатомов и хирургов. Мы также предлагаем индивидуальные VIP-диссекции и полную организацию cadaver курсов под ключ, включая переговоры с университетами, аренду лабораторий, предоставление преподавателей и всех необходимых материалов.',
      en: 'Anatomy and cadaver programs from Estedilux Med provide a unique opportunity for in-depth study of human anatomy through practical dissection programs. We organize courses in university anatomy laboratories equipped to world standards, where doctors can study facial, neck and other anatomical areas on real cadavers. Our programs include the study of injectable anatomy, surgical anatomy and practical dissections under the guidance of experienced anatomists and surgeons. We also offer individual VIP dissections and complete turnkey cadaver course organization, including negotiations with universities, laboratory rental, provision of instructors and all necessary materials.',
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
    id: 3,
    title: {
      ru: 'Гинекология и репродуктология',
      en: 'Gynecology and Reproductive Medicine',
    },
    description: {
      ru: 'Estedilux Med предлагает комплексные программы по гинекологии, акушерству и репродуктивной медицине, разработанные для врачей, стремящихся углубить свои знания и практические навыки в этих областях. Наши программы охватывают широкий спектр направлений: от общей гинекологии и гинекологической хирургии до эндоскопических техник и репродуктологии. Мы организуем стажировки в ведущих клиниках, где врачи могут наблюдать за операциями, участвовать в клинических разборах и изучать современные протоколы лечения. Особое внимание уделяется программам по репродуктивной медицине, включая ЭКО и репродуктивную эндокринологию, а также неонатологии для работы в отделениях интенсивной терапии новорожденных.',
      en: 'Estedilux Med offers comprehensive programs in gynecology, obstetrics and reproductive medicine, designed for doctors seeking to deepen their knowledge and practical skills in these areas. Our programs cover a wide range of areas: from general gynecology and gynecological surgery to endoscopic techniques and reproductive medicine. We organize internships in leading clinics where doctors can observe operations, participate in clinical case discussions and study modern treatment protocols. Special attention is paid to reproductive medicine programs, including IVF and reproductive endocrinology, as well as neonatology for work in neonatal intensive care units.',
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
    id: 4,
    title: {
      ru: 'Стоматология и челюстно-лицевая хирургия',
      en: 'Dentistry and Maxillofacial Surgery',
    },
    description: {
      ru: 'Программы по стоматологии и челюстно-лицевой хирургии от Estedilux Med предоставляют врачам доступ к современным методикам и технологиям в области стоматологии. Наши программы включают хирургическую стоматологию, имплантологию, ортопедию, ортодонтию и эстетическую стоматологию. Мы организуем стажировки в ведущих стоматологических клиниках и университетах, где врачи могут изучать передовые техники имплантации, протезирования и ортодонтического лечения. Особое внимание уделяется практическим навыкам работы с современными материалами и оборудованием, а также изучению международных протоколов лечения. Наши программы подходят как для начинающих, так и для опытных стоматологов, желающих расширить свой профессиональный арсенал.',
      en: 'Dentistry and maxillofacial surgery programs from Estedilux Med provide doctors with access to modern methods and technologies in dentistry. Our programs include surgical dentistry, implantology, orthopedics, orthodontics and aesthetic dentistry. We organize internships in leading dental clinics and universities where doctors can study advanced techniques in implantation, prosthetics and orthodontic treatment. Special attention is paid to practical skills in working with modern materials and equipment, as well as studying international treatment protocols. Our programs are suitable for both beginners and experienced dentists who want to expand their professional arsenal.',
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
    id: 5,
    title: {
      ru: 'Пластическая и реконструктивная хирургия',
      en: 'Plastic and Reconstructive Surgery',
    },
    description: {
      ru: 'Программы по пластической и реконструктивной хирургии от Estedilux Med предназначены для врачей, стремящихся освоить современные техники эстетической и реконструктивной хирургии. Наши программы охватывают широкий спектр процедур: от пластики лица и ринопластики до маммопластики, липосакции и контурирования тела. Мы организуем стажировки в ведущих клиниках пластической хирургии, где врачи могут наблюдать за операциями, изучать техники выполнения различных процедур и участвовать в послеоперационном ведении пациентов. Особое внимание уделяется изучению анатомии, планированию операций и управлению осложнениями. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов пластической хирургии.',
      en: 'Plastic and reconstructive surgery programs from Estedilux Med are designed for doctors seeking to master modern techniques in aesthetic and reconstructive surgery. Our programs cover a wide range of procedures: from facial plastic surgery and rhinoplasty to mammoplasty, liposuction and body contouring. We organize internships in leading plastic surgery clinics where doctors can observe operations, study techniques for performing various procedures and participate in postoperative patient management. Special attention is paid to the study of anatomy, surgical planning and complication management. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of plastic surgery.',
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
    id: 6,
    title: {
      ru: 'Общая и малоинвазивная хирургия',
      en: 'General and Minimally Invasive Surgery',
    },
    description: {
      ru: 'Программы по общей и малоинвазивной хирургии от Estedilux Med предоставляют врачам возможность освоить современные техники хирургического лечения с минимальной инвазивностью. Наши программы включают лапароскопическую хирургию, эндоскопию ЖКТ и другие минимально инвазивные техники, которые позволяют сократить период восстановления пациентов и снизить риск осложнений. Мы организуем стажировки в ведущих хирургических центрах, где врачи могут изучать передовые методики, наблюдать за операциями и участвовать в практических занятиях. Особое внимание уделяется трансплантологии и современным подходам к хирургическому лечению различных заболеваний. Наши программы подходят как для начинающих хирургов, так и для опытных специалистов, желающих расширить свои навыки.',
      en: 'General and minimally invasive surgery programs from Estedilux Med provide doctors with the opportunity to master modern surgical treatment techniques with minimal invasiveness. Our programs include laparoscopic surgery, gastrointestinal endoscopy and other minimally invasive techniques that allow reducing patient recovery time and lowering the risk of complications. We organize internships in leading surgical centers where doctors can study advanced techniques, observe operations and participate in practical sessions. Special attention is paid to transplantology and modern approaches to surgical treatment of various diseases. Our programs are suitable for both beginning surgeons and experienced specialists seeking to expand their skills.',
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
    id: 7,
    title: {
      ru: 'Ортопедия, травматология и спортивная медицина',
      en: 'Orthopedics, Traumatology and Sports Medicine',
    },
    description: {
      ru: 'Программы по ортопедии, травматологии и спортивной медицине от Estedilux Med разработаны для врачей, работающих с заболеваниями опорно-двигательного аппарата и спортивными травмами. Наши программы охватывают ортопедическую хирургию, травматологию, вертебрологию и спортивную медицину. Мы организуем стажировки в ведущих ортопедических клиниках и спортивных медицинских центрах, где врачи могут изучать современные техники лечения переломов, заболеваний суставов и позвоночника. Особое внимание уделяется спортивной медицине и реабилитации, включая работу с профессиональными спортсменами и восстановление после травм. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов ортопедии и травматологии.',
      en: 'Orthopedics, traumatology and sports medicine programs from Estedilux Med are designed for doctors working with musculoskeletal diseases and sports injuries. Our programs cover orthopedic surgery, traumatology, vertebrology and sports medicine. We organize internships in leading orthopedic clinics and sports medicine centers where doctors can study modern techniques for treating fractures, joint and spine diseases. Special attention is paid to sports medicine and rehabilitation, including work with professional athletes and recovery after injuries. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of orthopedics and traumatology.',
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
    id: 8,
    title: {
      ru: 'Неврология и нейрохирургия',
      en: 'Neurology and Neurosurgery',
    },
    description: {
      ru: 'Программы по неврологии и нейрохирургии от Estedilux Med предоставляют врачам возможность углубить свои знания в области диагностики и лечения заболеваний нервной системы. Наши программы включают клиническую неврологию, нейрохирургию, нейроортопедию и нейрореабилитацию. Мы организуем стажировки в ведущих неврологических и нейрохирургических центрах, где врачи могут изучать современные методы диагностики, наблюдать за операциями на головном и спинном мозге и участвовать в клинических разборах сложных случаев. Особое внимание уделяется нейрореабилитации и восстановительному лечению пациентов с неврологическими нарушениями. Наши программы подходят как для неврологов, так и для нейрохирургов, желающих расширить свои профессиональные навыки.',
      en: 'Neurology and neurosurgery programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in the diagnosis and treatment of nervous system diseases. Our programs include clinical neurology, neurosurgery, neuroorthopedics and neurorehabilitation. We organize internships in leading neurological and neurosurgical centers where doctors can study modern diagnostic methods, observe operations on the brain and spinal cord and participate in clinical case discussions of complex cases. Special attention is paid to neurorehabilitation and restorative treatment of patients with neurological disorders. Our programs are suitable for both neurologists and neurosurgeons seeking to expand their professional skills.',
    },
    subcategories: [
      { ru: 'Клиническая неврология', en: 'Clinical Neurology' },
      { ru: 'Нейрохирургия', en: 'Neurosurgery' },
      { ru: 'Нейроортопедия', en: 'Neuroorthopedics' },
      { ru: 'Нейрореабилитация', en: 'Neurorehabilitation' },
    ],
  },
  {
    id: 9,
    title: {
      ru: 'Кардиология и кардиохирургия',
      en: 'Cardiology and Cardiac Surgery',
    },
    description: {
      ru: 'Программы по кардиологии и кардиохирургии от Estedilux Med разработаны для врачей, работающих с заболеваниями сердечно-сосудистой системы. Наши программы охватывают клиническую кардиологию, интервенционную кардиологию, детскую кардиохирургию, электрофизиологию и имплантацию кардиостимуляторов. Мы организуем стажировки в ведущих кардиологических и кардиохирургических центрах, где врачи могут изучать современные методы диагностики и лечения, наблюдать за операциями на сердце и участвовать в интервенционных процедурах. Особое внимание уделяется детской кардиохирургии и работе с врожденными пороками сердца. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов кардиологии и кардиохирургии.',
      en: 'Cardiology and cardiac surgery programs from Estedilux Med are designed for doctors working with cardiovascular diseases. Our programs cover clinical cardiology, interventional cardiology, pediatric cardiac surgery, electrophysiology and pacemaker implantation. We organize internships in leading cardiology and cardiac surgery centers where doctors can study modern diagnostic and treatment methods, observe heart operations and participate in interventional procedures. Special attention is paid to pediatric cardiac surgery and work with congenital heart defects. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of cardiology and cardiac surgery.',
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
    id: 10,
    title: {
      ru: 'Терапевтические направления',
      en: 'Therapeutic Specialties',
    },
    description: {
      ru: 'Программы по терапевтическим направлениям от Estedilux Med предоставляют врачам возможность углубить свои знания в области внутренней медицины и различных терапевтических специальностей. Наши программы охватывают общую терапию, эндокринологию, нефрологию, пульмонологию и гастроэнтерологию. Мы организуем стажировки в ведущих терапевтических клиниках и медицинских центрах, где врачи могут изучать современные протоколы диагностики и лечения различных заболеваний внутренних органов. Особое внимание уделяется междисциплинарному подходу и комплексному ведению пациентов с множественными заболеваниями. Наши программы подходят как для терапевтов общего профиля, так и для узких специалистов, желающих расширить свои знания в смежных областях.',
      en: 'Therapeutic specialties programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in internal medicine and various therapeutic specialties. Our programs cover general internal medicine, endocrinology, nephrology, pulmonology and gastroenterology. We organize internships in leading therapeutic clinics and medical centers where doctors can study modern protocols for diagnosis and treatment of various internal organ diseases. Special attention is paid to interdisciplinary approach and comprehensive management of patients with multiple diseases. Our programs are suitable for both general practitioners and specialists seeking to expand their knowledge in related fields.',
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
    id: 11,
    title: {
      ru: 'Радиология и УЗ-диагностика',
      en: 'Radiology and Ultrasound Diagnostics',
    },
    description: {
      ru: 'Программы по радиологии и ультразвуковой диагностике от Estedilux Med предоставляют врачам возможность освоить современные методы визуализации и диагностики. Наши программы охватывают диагностическую радиологию, интервенционную радиологию, экспертное УЗИ, эхокардиографию и ультразвуковую диагностику в акушерстве и гинекологии. Мы организуем стажировки в ведущих радиологических центрах и клиниках, где врачи могут изучать работу с современным диагностическим оборудованием, осваивать техники интерпретации изображений и участвовать в интервенционных процедурах. Особое внимание уделяется экспертному УЗИ и работе с различными типами ультразвуковых исследований. Наши программы подходят как для начинающих радиологов, так и для опытных специалистов, желающих расширить свои навыки работы с современными диагностическими технологиями.',
      en: 'Radiology and ultrasound diagnostics programs from Estedilux Med provide doctors with the opportunity to master modern imaging and diagnostic methods. Our programs cover diagnostic radiology, interventional radiology, expert ultrasound, echocardiography and ultrasound diagnostics in obstetrics and gynecology. We organize internships in leading radiology centers and clinics where doctors can study working with modern diagnostic equipment, master image interpretation techniques and participate in interventional procedures. Special attention is paid to expert ultrasound and work with various types of ultrasound examinations. Our programs are suitable for both beginning radiologists and experienced specialists seeking to expand their skills in working with modern diagnostic technologies.',
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
    id: 12,
    title: {
      ru: 'Педиатрия',
      en: 'Pediatrics',
    },
    description: {
      ru: 'Программы по педиатрии от Estedilux Med разработаны для врачей, работающих с детьми и подростками. Наши программы охватывают общую педиатрию, детскую хирургию, детскую кардиологию и неонатологию. Мы организуем стажировки в ведущих детских больницах и медицинских центрах, где врачи могут изучать особенности диагностики и лечения заболеваний у детей различных возрастных групп. Особое внимание уделяется неонатологии и работе с новорожденными, включая ведение недоношенных детей и детей с врожденными патологиями. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов педиатрии и детской медицины.',
      en: 'Pediatrics programs from Estedilux Med are designed for doctors working with children and adolescents. Our programs cover general pediatrics, pediatric surgery, pediatric cardiology and neonatology. We organize internships in leading children\'s hospitals and medical centers where doctors can study the specifics of diagnosis and treatment of diseases in children of various age groups. Special attention is paid to neonatology and work with newborns, including management of premature infants and children with congenital pathologies. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of pediatrics and child medicine.',
    },
    subcategories: [
      { ru: 'Общая педиатрия', en: 'General Pediatrics' },
      { ru: 'Детская хирургия', en: 'Pediatric Surgery' },
      { ru: 'Детская кардиология', en: 'Pediatric Cardiology' },
      { ru: 'Неонатология', en: 'Neonatology' },
    ],
  },
  {
    id: 13,
    title: {
      ru: 'Урология',
      en: 'Urology',
    },
    description: {
      ru: 'Программы по урологии от Estedilux Med предоставляют врачам возможность углубить свои знания в области диагностики и лечения заболеваний мочеполовой системы. Наши программы охватывают общую урологию, оперативную урологию и малоинвазивные процедуры. Мы организуем стажировки в ведущих урологических клиниках, где врачи могут изучать современные техники диагностики и лечения, наблюдать за операциями и участвовать в малоинвазивных процедурах. Особое внимание уделяется эндоскопическим техникам и современным подходам к лечению урологических заболеваний. Наши программы подходят как для начинающих урологов, так и для опытных специалистов, желающих расширить свои профессиональные навыки.',
      en: 'Urology programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in the diagnosis and treatment of genitourinary system diseases. Our programs cover general urology, operative urology and minimally invasive procedures. We organize internships in leading urological clinics where doctors can study modern diagnostic and treatment techniques, observe operations and participate in minimally invasive procedures. Special attention is paid to endoscopic techniques and modern approaches to treating urological diseases. Our programs are suitable for both beginning urologists and experienced specialists seeking to expand their professional skills.',
    },
    subcategories: [
      { ru: 'Общая урология', en: 'General Urology' },
      { ru: 'Оперативная урология', en: 'Operative Urology' },
      { ru: 'Малоинвазивные процедуры', en: 'Minimally Invasive Procedures' },
    ],
  },
  {
    id: 14,
    title: {
      ru: 'Онкология',
      en: 'Oncology',
    },
    description: {
      ru: 'Программы по онкологии от Estedilux Med разработаны для врачей, работающих с онкологическими заболеваниями. Наши программы охватывают хирургическую онкологию, медицинскую онкологию, онкопластику и онкогинекологию. Мы организуем стажировки в ведущих онкологических центрах, где врачи могут изучать современные методы диагностики и лечения рака, наблюдать за операциями и участвовать в мультидисциплинарных консилиумах. Особое внимание уделяется онкопластической хирургии, которая сочетает онкологическое лечение с реконструктивными техниками. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов онкологии и современных подходов к лечению онкологических заболеваний.',
      en: 'Oncology programs from Estedilux Med are designed for doctors working with oncological diseases. Our programs cover surgical oncology, medical oncology, oncoplastic surgery and oncogynecology. We organize internships in leading oncology centers where doctors can study modern methods of cancer diagnosis and treatment, observe operations and participate in multidisciplinary consultations. Special attention is paid to oncoplastic surgery, which combines cancer treatment with reconstructive techniques. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of oncology and modern approaches to treating oncological diseases.',
    },
    subcategories: [
      { ru: 'Хирургическая онкология', en: 'Surgical Oncology' },
      { ru: 'Медицинская онкология', en: 'Medical Oncology' },
      { ru: 'Онкопластика', en: 'Oncoplastic Surgery' },
      { ru: 'Онкогинекология', en: 'Oncogynecology' },
    ],
  },
  {
    id: 15,
    title: {
      ru: 'Офтальмология',
      en: 'Ophthalmology',
    },
    description: {
      ru: 'Программы по офтальмологии от Estedilux Med предоставляют врачам возможность углубить свои знания в области диагностики и лечения заболеваний глаз. Наши программы охватывают диагностику, лазерную офтальмологию, микрохирургию глаза, хирургическое лечение и современные методы коррекции зрения. Мы организуем стажировки в ведущих офтальмологических клиниках, где врачи могут изучать работу с современным диагностическим оборудованием, осваивать техники выполнения различных офтальмологических операций и участвовать в лазерных процедурах. Особое внимание уделяется микрохирургии глаза и современным методам коррекции зрения, включая рефракционную хирургию. Наши программы подходят как для начинающих офтальмологов, так и для опытных специалистов, желающих расширить свои профессиональные навыки.',
      en: 'Ophthalmology programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in the diagnosis and treatment of eye diseases. Our programs cover diagnostics, laser ophthalmology, eye microsurgery, surgical treatment and modern vision correction methods. We organize internships in leading ophthalmological clinics where doctors can study working with modern diagnostic equipment, master techniques for performing various ophthalmic operations and participate in laser procedures. Special attention is paid to eye microsurgery and modern vision correction methods, including refractive surgery. Our programs are suitable for both beginning ophthalmologists and experienced specialists seeking to expand their professional skills.',
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
    id: 16,
    title: {
      ru: 'Инфекционные заболевания',
      en: 'Infectious Diseases',
    },
    description: {
      ru: 'Программы по инфекционным заболеваниям от Estedilux Med разработаны для врачей, работающих с инфекционными болезнями и вопросами госпитальной эпидемиологии. Наши программы охватывают клиническую инфектологию и госпитальную эпидемиологию с акцентом на безопасность пациентов и медицинского персонала. Мы организуем стажировки в ведущих инфекционных больницах и медицинских центрах, где врачи могут изучать современные протоколы диагностики и лечения инфекционных заболеваний, методы профилактики внутрибольничных инфекций и принципы организации инфекционного контроля. Особое внимание уделяется работе с резистентными возбудителями и современным подходам к антимикробной терапии. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов инфектологии и эпидемиологии.',
      en: 'Infectious diseases programs from Estedilux Med are designed for doctors working with infectious diseases and hospital epidemiology issues. Our programs cover clinical infectious diseases and hospital epidemiology with emphasis on patient and healthcare worker safety. We organize internships in leading infectious disease hospitals and medical centers where doctors can study modern protocols for diagnosis and treatment of infectious diseases, methods for preventing nosocomial infections and principles of infection control organization. Special attention is paid to work with resistant pathogens and modern approaches to antimicrobial therapy. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of infectious diseases and epidemiology.',
    },
    subcategories: [
      { ru: 'Клиническая инфектология', en: 'Clinical Infectious Diseases' },
      { ru: 'Госпитальная эпидемиология и безопасность', en: 'Hospital Epidemiology and Safety' },
    ],
  },
  {
    id: 17,
    title: {
      ru: 'Лабораторная медицина и генетика',
      en: 'Laboratory Medicine and Genetics',
    },
    description: {
      ru: 'Программы по лабораторной медицине и генетике от Estedilux Med предоставляют врачам возможность углубить свои знания в области лабораторной диагностики и медицинской генетики. Наши программы охватывают работу в клинических лабораториях, ПЦР-диагностику, медицинскую генетику и пренатальную диагностику. Мы организуем стажировки в ведущих лабораторных центрах и генетических клиниках, где врачи могут изучать современные методы лабораторной диагностики, работу с генетическим материалом и интерпретацию результатов генетических исследований. Особое внимание уделяется пренатальной диагностике и работе с наследственными заболеваниями. Наши программы подходят как для лаборантов и врачей-лаборантов, так и для генетиков, желающих расширить свои профессиональные навыки.',
      en: 'Laboratory medicine and genetics programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in laboratory diagnostics and medical genetics. Our programs cover work in clinical laboratories, PCR diagnostics, medical genetics and prenatal diagnostics. We organize internships in leading laboratory centers and genetic clinics where doctors can study modern methods of laboratory diagnostics, work with genetic material and interpretation of genetic test results. Special attention is paid to prenatal diagnostics and work with hereditary diseases. Our programs are suitable for both laboratory technicians and laboratory doctors, as well as geneticists seeking to expand their professional skills.',
    },
    subcategories: [
      { ru: 'Клинические лаборатории', en: 'Clinical Laboratories' },
      { ru: 'ПЦР-диагностика', en: 'PCR Diagnostics' },
      { ru: 'Медицинская генетика', en: 'Medical Genetics' },
      { ru: 'Пренатальная диагностика', en: 'Prenatal Diagnostics' },
    ],
  },
  {
    id: 18,
    title: {
      ru: 'Психиатрия и психотерапия',
      en: 'Psychiatry and Psychotherapy',
    },
    description: {
      ru: 'Программы по психиатрии и психотерапии от Estedilux Med разработаны для врачей, работающих с психическими расстройствами и психологическими проблемами пациентов. Наши программы охватывают клиническую психиатрию, психотерапию и нейропсихологию. Мы организуем стажировки в ведущих психиатрических клиниках и центрах психотерапии, где врачи могут изучать современные методы диагностики и лечения психических расстройств, различные подходы к психотерапии и работу с нейропсихологическими нарушениями. Особое внимание уделяется интегративному подходу к лечению и работе с пациентами различных возрастных групп. Наши программы включают как теоретическую подготовку, так и практические занятия, что позволяет врачам получить комплексное понимание всех аспектов психиатрии и психотерапии.',
      en: 'Psychiatry and psychotherapy programs from Estedilux Med are designed for doctors working with mental disorders and psychological problems of patients. Our programs cover clinical psychiatry, psychotherapy and neuropsychology. We organize internships in leading psychiatric clinics and psychotherapy centers where doctors can study modern methods of diagnosis and treatment of mental disorders, various approaches to psychotherapy and work with neuropsychological disorders. Special attention is paid to integrative approach to treatment and work with patients of various age groups. Our programs include both theoretical training and practical sessions, allowing doctors to gain a comprehensive understanding of all aspects of psychiatry and psychotherapy.',
    },
    subcategories: [
      { ru: 'Клиническая психиатрия', en: 'Clinical Psychiatry' },
      { ru: 'Психотерапия', en: 'Psychotherapy' },
      { ru: 'Нейропсихология', en: 'Neuropsychology' },
    ],
  },
  {
    id: 19,
    title: {
      ru: 'Паллиативная медицина',
      en: 'Palliative Medicine',
    },
    description: {
      ru: 'Программы по паллиативной медицине от Estedilux Med предоставляют врачам возможность углубить свои знания в области комплексной паллиативной помощи и поддержки тяжелых пациентов. Наши программы охватывают комплексную паллиативную помощь, обезболивание и поддержку пациентов с тяжелыми и неизлечимыми заболеваниями. Мы организуем стажировки в ведущих паллиативных центрах и хосписах, где врачи могут изучать современные подходы к обезболиванию, психологической поддержке пациентов и их семей, а также принципы организации паллиативной помощи. Особое внимание уделяется работе с терминальными пациентами и обеспечению качества жизни на всех этапах заболевания. Наши программы подходят как для врачей общего профиля, так и для специалистов, желающих специализироваться в паллиативной медицине.',
      en: 'Palliative medicine programs from Estedilux Med provide doctors with the opportunity to deepen their knowledge in comprehensive palliative care and support for critically ill patients. Our programs cover comprehensive palliative care, pain management and support for patients with severe and incurable diseases. We organize internships in leading palliative care centers and hospices where doctors can study modern approaches to pain management, psychological support for patients and their families, as well as principles of palliative care organization. Special attention is paid to work with terminal patients and ensuring quality of life at all stages of the disease. Our programs are suitable for both general practitioners and specialists seeking to specialize in palliative medicine.',
    },
    subcategories: [
      { ru: 'Комплексная паллиативная помощь', en: 'Comprehensive Palliative Care' },
      { ru: 'Обезболивание и поддержка тяжелых пациентов', en: 'Pain Management and Support for Critically Ill Patients' },
    ],
  },
  {
    id: 20,
    title: {
      ru: 'Специальные программы Estedilux Med',
      en: 'Special Estedilux Med Programs',
    },
    description: {
      ru: 'Специальные программы Estedilux Med представляют собой уникальные образовательные и сервисные решения, разработанные для врачей, клиник и медицинских организаций. Мы предлагаем стажировки в клиниках и университетах, индивидуальные программы обучения в формате 1:1, авторские курсы и методики, организацию медицинских мероприятий под ключ, а также комплексную поддержку врачей в процессе релокации в Дубай. Наши программы включают полную организацию cadaver курсов, подготовку документов для лицензирования в ОАЭ (DHA, DOH, MOH) и индивидуальные маршруты профессионального развития. Мы работаем с ведущими медицинскими центрами в Турции, ОАЭ и Грузии, обеспечивая врачам доступ к лучшим международным практикам и образовательным ресурсам. Каждая программа адаптируется под конкретные потребности и цели врача или организации.',
      en: 'Special Estedilux Med programs represent unique educational and service solutions designed for doctors, clinics and medical organizations. We offer internships in clinics and universities, individual 1:1 training programs, custom courses and methodologies, turnkey medical event organization, as well as comprehensive support for doctors in the relocation process to Dubai. Our programs include complete organization of cadaver courses, document preparation for licensing in the UAE (DHA, DOH, MOH) and individual professional development paths. We work with leading medical centers in Turkey, UAE and Georgia, providing doctors with access to the best international practices and educational resources. Each program is adapted to the specific needs and goals of the doctor or organization.',
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
