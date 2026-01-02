import { BlogPost } from '@/types/blog';
import { convertToMarkdown } from '@/lib/blogConverter';
import type { BlogPostContentItem } from '@/types/blog';

// Старі дані для конвертації
const oldBlogData = [
  {
    id: 1,
    image: '/blog/1.jpg',
    date: '2025-11-15',
    title: {
      ru: 'Почему врач должен постоянно развиваться? 😍🚀',
      en: 'Why should a doctor constantly develop? 😍🚀',
    },
    content: {
      ru: [
        {
          type: 'paragraph',
          content: 'В медицине нет точки «я уже всё знаю» 📚',
        },
        {
          type: 'paragraph',
          content: 'Каждый новый препарат, техника или методика меняют стандарты работы. Если врач останавливается в развитии, он автоматически начинает отставать и это видят пациенты 😔',
        },
        {
          type: 'heading',
          content: '🔹 Обучение = доход',
        },
        {
          type: 'paragraph',
          content: 'Знания напрямую отражаются на финансовом уровне врача:',
        },
        {
          type: 'list',
          content: [
            'Пациенты выбирают тех, кто владеет современными методами.',
            'Чем выше квалификация, тем выше стоимость услуг.',
            'Постоянное развитие формирует доверие и репутацию эксперта.',
          ],
        },
        {
          type: 'paragraph',
          content: '🔹Обучение - это не расход, а инвестиция. Каждый вложенный час и каждая новая техника возвращаются в виде большего потока пациентов, высокого чека и уверенности в себе и безопасности для пациентов ❤️',
        },
      ] as BlogPostContentItem[],
      en: [
        {
          type: 'paragraph',
          content: 'In medicine, there is no point "I know everything" 📚',
        },
        {
          type: 'paragraph',
          content: 'Every new drug, technique or method changes work standards. If a doctor stops developing, they automatically start falling behind, and patients see this 😔',
        },
        {
          type: 'heading',
          content: '🔹 Learning = income',
        },
        {
          type: 'paragraph',
          content: 'Knowledge directly reflects on the financial level of the doctor:',
        },
        {
          type: 'list',
          content: [
            'Patients choose those who master modern methods.',
            'The higher the qualification, the higher the cost of services.',
            'Constant development builds trust and expert reputation.',
          ],
        },
        {
          type: 'paragraph',
          content: '🔹Learning is not an expense, but an investment. Every hour invested and every new technique returns in the form of a larger flow of patients, a higher check, and confidence in yourself and safety for patients ❤️',
        },
      ] as BlogPostContentItem[],
    },
  },
  {
    id: 2,
    image: '/blog/2.jpg',
    date: '2025-11-20',
    title: {
      ru: 'ТОП- 5 😍 причин поехать на стажировку в Дубай с Estedilux Med ✈️💎',
      en: 'TOP- 5 😍 reasons to go on an internship in Dubai with Estedilux Med ✈️💎',
    },
    content: {
      ru: [
        {
          type: 'heading',
          content: '1️⃣ Полное погружение в клинику изнутри',
        },
        {
          type: 'paragraph',
          content: 'Вы будете не просто гостями, а наблюдателями за кулисами: узнаете, как устроена клиника, рабочие кабинеты, маршруты пациентов, система администрирования, взаимодействие врачей и маркетинга. Это реальный опыт изнутри - от приёма первого пациента до повторных визитов.',
        },
        {
          type: 'heading',
          content: '2️⃣ Международное комьюнити и ценные связи',
        },
        {
          type: 'paragraph',
          content: 'Мы соберём вас с врачами, владельцами клиник и предпринимателями из разных стран. Такие знакомства открывают путь к партнёрствам, трудоустройству и новым проектам в ОАЭ и за его пределами.',
        },
        {
          type: 'heading',
          content: '3️⃣ Документы, лицензии и легализация',
        },
        {
          type: 'paragraph',
          content: 'Вы получите чёткий алгоритм: как подтвердить диплом, пройти экзамен, оформить медицинскую лицензию или открыть бизнес в Дубае. Всё с актуальными схемами, прямыми контактами и пошаговыми инструкциями.',
        },
        {
          type: 'heading',
          content: '4️⃣ Доступ к бизнес-инсайдам и рынку ОАЭ',
        },
        {
          type: 'paragraph',
          content: 'Вы узнаете, какие услуги востребованы, как тестировать спрос, формировать цены, находить платёжеспособных клиентов и адаптировать маркетинг под законы и менталитет Дубая.',
        },
        {
          type: 'heading',
          content: '5️⃣ Эксклюзив Estedilux Med',
        },
        {
          type: 'paragraph',
          content: 'Только у нас - доступ к клиникам, площадкам и экспертам, куда не попасть на стандартных турах или открытых мероприятиях. Программа создаётся под ваш запрос, чтобы вы вернулись домой с готовым планом интеграции в рынок ОАЭ, а не с набором общих лекций.',
        },
        {
          type: 'paragraph',
          content: 'Ждем на стажировке в Дубай от Estedilux Med 🎓',
        },
      ] as BlogPostContentItem[],
      en: [
        {
          type: 'heading',
          content: '1️⃣ Complete immersion in the clinic from the inside',
        },
        {
          type: 'paragraph',
          content: 'You will not just be guests, but observers behind the scenes: you will learn how the clinic is organized, work offices, patient routes, administration system, interaction between doctors and marketing. This is real experience from the inside - from the first patient appointment to repeat visits.',
        },
        {
          type: 'heading',
          content: '2️⃣ International community and valuable connections',
        },
        {
          type: 'paragraph',
          content: 'We will gather you with doctors, clinic owners and entrepreneurs from different countries. Such acquaintances open the way to partnerships, employment and new projects in the UAE and beyond.',
        },
        {
          type: 'heading',
          content: '3️⃣ Documents, licenses and legalization',
        },
        {
          type: 'paragraph',
          content: 'You will receive a clear algorithm: how to confirm a diploma, pass an exam, obtain a medical license or open a business in Dubai. Everything with current schemes, direct contacts and step-by-step instructions.',
        },
        {
          type: 'heading',
          content: '4️⃣ Access to business insights and the UAE market',
        },
        {
          type: 'paragraph',
          content: 'You will learn what services are in demand, how to test demand, set prices, find paying customers and adapt marketing to the laws and mentality of Dubai.',
        },
        {
          type: 'heading',
          content: '5️⃣ Estedilux Med Exclusive',
        },
        {
          type: 'paragraph',
          content: 'Only with us - access to clinics, venues and experts that cannot be reached on standard tours or open events. The program is created according to your request, so that you return home with a ready-made plan for integration into the UAE market, and not with a set of general lectures.',
        },
        {
          type: 'paragraph',
          content: 'We are waiting for you at the internship in Dubai from Estedilux Med 🎓',
        },
      ] as BlogPostContentItem[],
    },
  },
  {
    id: 3,
    image: '/blog/3.jpg',
    date: '2025-10-10',
    title: {
      ru: '3️⃣ Как заработать на стажировке в Дубай с Estedilux Med? 💰🚀',
      en: '3️⃣ How to earn on an internship in Dubai with Estedilux Med? 💰🚀',
    },
    content: {
      ru: [
        {
          type: 'paragraph',
          content: 'Текст статьи о заработке на стажировке в Дубай с Estedilux Med',
        },
      ] as BlogPostContentItem[],
      en: [
        {
          type: 'paragraph',
          content: 'Text of the article about earning on an internship in Dubai with Estedilux Med',
        },
      ] as BlogPostContentItem[],
    },
  },
  {
    id: 4,
    image: '/blog/4.jpg',
    date: '2025-10-10',
    title: {
      ru: 'Шесть причин 🤩, почему курс стоит пройти курс "Advanced implant & Maxillofacial Surgery"🔥',
      en: 'Six reasons 🤩, why the course is worth taking the course "Advanced implant & Maxillofacial Surgery"🔥',
    },
    content: {
      ru: [
        {
          type: 'heading',
          content: '✅ Вы отработаете реальные хирургические протоколы',
        },
        {
          type: 'paragraph',
          content: 'Не просто теория, а пошаговая логика работы — от планирования до фиксации импланта. Каждый этап выполняется под контролем наставника: позиционирование, выбор мембраны, техника шва, формирование лоскута.',
        },
        {
          type: 'paragraph',
          content: '🎯 После курса врач уходит с готовыми решениями для собственных операций.',
        },
        {
          type: 'heading',
          content: '✅ Разбор сложных клинических случаев',
        },
        {
          type: 'paragraph',
          content: 'Зигоматические, птеригоидные, All-on-4/6, Ridge Split, GBR - с разбором типичных ошибок и нюансов.',
        },
        {
          type: 'paragraph',
          content: 'Эти техники - ключ к более дорогим кейсам в практике, поэтому вложение в курс = рост среднего чека врача.',
        },
        {
          type: 'heading',
          content: '✅ Максимум практики на биоматериале',
        },
        {
          type: 'paragraph',
          content: 'Малокомплектная группа обеспечивает персональную отработку каждого этапа.'
        },
        {
          type: 'paragraph',
          content: 'Не наблюдение - а работа руками.'
        },
        {
          type: 'paragraph',
          content: '- Прямое закрепление моторики, уверенности и скорости.'
        },
        {
          type: 'heading',
          content: '✅ Интеграция хирургии и имплантологии',
        },
        {
          type: 'paragraph',
          content: 'Курс объединяет подходы челюстно-лицевой хирургии и классической имплантологии.'
        },
        {
          type: 'paragraph',
          content: 'Вы поймёте, как адаптировать техники под любой клинический сценарий - от ограниченного костного объёма до атрофии гребня.'
        },
        {
          type: 'heading',
          content: '✅ Современные материалы и протоколы',
        },
        {
          type: 'paragraph',
          content: 'Практическая работа с Titan Mesh, PTFE, коллагеновыми мембранами, синтетическими и ксеногенными материалами.'
        },
        {
          type: 'paragraph',
          content: 'Вы научитесь подбирать материал под задачу и контролировать регенерацию предсказуемо.'
        },
        {
          type: 'heading',
          content: '✅ Рост профессионального статуса',
        },
        {
          type: 'paragraph',
          content: 'Программа ориентирована на врачей, готовых перейти на уровень advanced-surgery.'
        },
        {
          type: 'paragraph',
          content: 'После курса вы можете расширять спектр услуг клиники, принимать сложные случаи и работать на уровне международных стандартов.'
        },
        {
          type: 'paragraph',
          content: 'Обучайтесь вместе с Estedilux Med 🎓'
        },
      ] as BlogPostContentItem[],
      en: [
        {
          type: 'heading',
          content: '✅ You will practice real surgical protocols',
          },
          {
          type: 'paragraph',
          content: 'Not just theory, but a step-by-step workflow—from planning to implant placement. Each stage is performed under the supervision of a mentor: positioning, membrane selection, suture technique, flap formation.',
          },
          {
          type: 'paragraph',
          content: '🎯 After the course, the doctor leaves with ready-made solutions for their own surgeries.',
          },
          {
          type: 'heading',
          content: '✅ Analysis of complex clinical cases',
          },
          {
          type: 'paragraph',
          content: 'Zygomatic, pterygoid, All-on-4/6, Ridge Split, GBR - with an analysis of typical errors and nuances.',
          },
          {
          type: 'paragraph',
          content: "These techniques are the key to more expensive cases in practice, so investing in the course = an increase in the average doctor's bill.",
          },
          {
          type: 'heading',
          content: '✅ Maximum practice on Biomaterial',
          },
          {
          type: 'paragraph',
          content: 'A small group ensures personalized practice of each stage.'
          },
          {
          type: 'paragraph',
          content: 'Not observation, but manual work.'
          },
          {
          type: 'paragraph',
          content: '- Direct reinforcement of motor skills, confidence, and speed.'
          },
          {
          type: 'heading',
          content: '✅ Integration of surgery and implantology',
          },
          {
          type: 'paragraph',
          content: 'The course combines approaches from maxillofacial surgery and classical implantology.'
          },
          {
          type: 'paragraph',
          content: 'You will understand how to adapt techniques to any clinical scenario—from limited bone volume to ridge atrophy.'
          },
          {
          type: 'heading',
          content: '✅ Modern Materials and Protocols',
          },
          {
          type: 'paragraph',
          content: 'Practical work with Titan Mesh, PTFE, collagen membranes, synthetic and xenogeneic materials.'
          },
          {
          type: 'paragraph',
          content: 'You will learn how to select the right material for the task and control regeneration predictably.'
          },
          {
          type: 'heading',
          content: '✅ Professional Development',
          },
          {
          type: 'paragraph',
          content: 'The program is designed for doctors ready to advance to the level of advanced surgery.'
          },
          {
            type: 'paragraph',
          content: "After completing the course, you can expand the clinic's range of services, accept complex cases, and work at international standards."
          },
          {
          type: 'paragraph',
          content: 'Learn with Estedilux Med 🎓'
          },
        
      ] as BlogPostContentItem[],
    },
  },
];

// Конвертуємо старі дані в Markdown формат
export const blogPosts: BlogPost[] = oldBlogData.map((post) => ({
  id: post.id,
  image: post.image,
  date: post.date,
  title: post.title,
  content: {
    ru: convertToMarkdown(post.content.ru),
    en: convertToMarkdown(post.content.en),
  },
}));
