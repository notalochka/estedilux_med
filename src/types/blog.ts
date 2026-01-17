// Типи для блогу

// Старий тип для конвертації (можна видалити після міграції)
export interface BlogPostContentItem {
  type: 'heading' | 'paragraph' | 'list';
  content: string | string[];
}

export interface BlogPost {
  id: number;
  image: string;
  date: string;
  title: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
  };
  content: {
    ru: string;  // Markdown текст для російської версії
    en: string;  // Markdown текст для англійської версії
    tr?: string;
    uk?: string;
  };
  published?: boolean;  // Чи опублікована стаття (для відображення на публічному сайті)
}

