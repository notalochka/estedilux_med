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
    image: '/blog/2.jpg',
    date: '2025-10-10',
    title: {
      ru: '4️⃣ Как заработать на стажировке в Дубай с Estedilux Med? 💰🚀',
      en: '4️⃣ How to earn on an internship in Dubai with Estedilux Med? 💰🚀',
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
